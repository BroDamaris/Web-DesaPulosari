# Sistem Informasi Website Desa Pulosari

Sistem ini merupakan platform digital untuk website profil Desa Pulosari, mencakup website publik, panel admin, dan backend API. Sistem ini dibangun menggunakan React (Vite), Cloudflare Workers, dan static HTML.

## Struktur Folder

```
backend/
  backend-pulosari/      # Backend API (Cloudflare Workers, Hono, Drizzle ORM)
frontend/
  website-desa-pulosari/ # Website publik (React + Vite)
  admin-desa-pulosari/   # Panel admin (React + Vite)
web-design/
  desa-pulosari/         # Static HTML & CSS (legacy/alternatif)
```

## Fitur Utama

- **Website Publik**: Informasi desa, berita, galeri, potensi, peta, struktur organisasi, dll.
- **Admin Panel**: Manajemen berita, galeri foto, pengguna, potensi desa, statistik, dll.
- **Backend API**: Otentikasi admin, CRUD berita, galeri, pengguna, terintegrasi dengan Dropbox untuk upload gambar.
- **Static Web Design**: Alternatif tampilan berbasis HTML/CSS untuk referensi atau fallback.

## Teknologi

- **Frontend**: React, Vite, Axios, React Router, Bootstrap, Tailwind CSS.
- **Backend**: Cloudflare Workers, Hono, Drizzle ORM, bcryptjs, Dropbox API.
- **Database**: Cloudflare D1 (SQL).
- **Deployment**: Cloudflare Pages & Workers.

## Cara Menjalankan

### Backend

1. Masuk ke folder `backend/backend-pulosari`
2. Jalankan API secara lokal:
   ```sh
   npm install
   npm run dev
   ```
3. Deploy ke Cloudflare:
   ```sh
   npm run deploy
   ```

### Frontend Website

1. Masuk ke folder `frontend/website-desa-pulosari`
2. Jalankan website publik:
   ```sh
   npm install
   npm run dev
   ```
3. Build untuk produksi:
   ```sh
   npm run build
   ```

### Admin Panel

1. Masuk ke folder `frontend/admin-desa-pulosari`
2. Jalankan admin panel:
   ```sh
   npm install
   npm run dev
   ```
3. Build untuk produksi:
   ```sh
   npm run build
   ```

### Web Design (Static)

- Buka file HTML di folder `web-design/desa-pulosari` menggunakan browser.

## Konfigurasi

- **API Endpoint**: Pastikan frontend mengarah ke URL backend yang benar (lihat variabel `API_BASE_URL` di frontend).
- **Dropbox**: Backend otomatis mengunggah gambar ke Dropbox dan menghasilkan link publik.

## Pengembangan

- Ikuti standar linting dan formatting yang sudah disediakan (`eslint.config.js`, `.prettierrc`).
- Untuk pengembangan backend, gunakan Cloudflare Wrangler.
- Untuk frontend, gunakan Vite dan React.

## Lisensi

Proyek ini dikembangkan untuk kebutuhan Desa Pulosari. Silakan hubungi pengelola untuk penggunaan lebih lanjut.
