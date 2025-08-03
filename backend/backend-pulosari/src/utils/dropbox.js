// Variabel global sederhana untuk cache token di memori
let cachedToken = {
	accessToken: null,
	expiresAt: null,
};

/**
 * Mendapatkan access token yang valid, mengambil yang baru jika perlu.
 * @param {object} c - Konteks dari environment (Hono, Cloudflare Workers, dll.)
 * @returns {Promise<string>} Access token yang valid.
 */
const getAccessToken = async (c) => {
	// Cek jika token di cache masih valid (misalnya, masih ada sisa waktu 5 menit)
	if (cachedToken.accessToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
		return cachedToken.accessToken;
	}

	console.log('Refreshing Dropbox access token...');

	const response = await fetch('https://api.dropbox.com/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			// Gunakan Basic Auth untuk mengirim app key & secret
			Authorization: `Basic ${btoa(`${c.env.DROPBOX_APP_KEY}:${c.env.DROPBOX_APP_SECRET}`)}`,
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: c.env.DROPBOX_REFRESH_TOKEN,
		}),
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Failed to refresh Dropbox token: ${errorData}`);
	}

	const tokenData = await response.json();

	// Simpan token baru dan waktu kedaluwarsanya di cache
	cachedToken.accessToken = tokenData.access_token;
	// expires_in dalam detik, konversi ke milidetik untuk timestamp
	cachedToken.expiresAt = Date.now() + tokenData.expires_in * 1000;

	return cachedToken.accessToken;
};

export const uploadToDropbox = async (c, file) => {
	// Dapatkan token yang valid terlebih dahulu
	const accessToken = await getAccessToken(c);

	const dropboxApiArg = {
		path: `/${file.name}`,
		mode: 'add',
		autorename: true,
		mute: false,
	};

	const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
		method: 'POST',
		headers: {
			// Gunakan token yang baru didapat
			Authorization: `Bearer ${accessToken}`,
			'Dropbox-API-Arg': JSON.stringify(dropboxApiArg),
			'Content-Type': 'application/octet-stream',
		},
		body: await file.arrayBuffer(),
	});

	if (!response.ok) {
		const errorData = await response.text();
		throw new Error(`Dropbox upload failed: ${errorData}`);
	}

	return response.json();
};

export const createSharedLink = async (c, pathLower) => {
	// Dapatkan token yang valid
	const accessToken = await getAccessToken(c);

	try {
		const response = await fetch('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				path: pathLower,
				settings: {
					requested_visibility: 'public',
				},
			}),
		});

		const data = await response.json();
		if (!response.ok) {
			// Tangani kasus link sudah ada
			if (data.error_summary.startsWith('shared_link_already_exists')) {
				return getExistingSharedLink(c, pathLower, accessToken);
			}
			throw new Error(`Failed to create shared link: ${JSON.stringify(data)}`);
		}

		return data.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
	} catch (error) {
		throw new Error(`Error in createSharedLink: ${error.message}`);
	}
};

// Fungsi helper untuk mengambil link yang sudah ada
const getExistingSharedLink = async (c, pathLower, accessToken) => {
	const listLinksResponse = await fetch('https://api.dropboxapi.com/2/sharing/list_shared_links', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${accessToken}`, // Gunakan token yang sudah ada
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			path: pathLower,
			direct_only: true,
		}),
	});

	const linksData = await listLinksResponse.json();
	if (linksData.links && linksData.links.length > 0) {
		return linksData.links[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
	}
	throw new Error('Shared link already exists but could not be retrieved.');
};

export const deleteFromDropbox = async (c, imageUrl) => {
	// Dapatkan token yang valid
	const accessToken = await getAccessToken(c);

	try {
		const url = new URL(imageUrl);
		const path = url.pathname;

		const response = await fetch('https://api.dropboxapi.com/2/files/delete_v2', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ path }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Failed to delete from Dropbox:', errorText);
		}
	} catch (error) {
		console.error('Error deleting from Dropbox:', error);
	}
};
