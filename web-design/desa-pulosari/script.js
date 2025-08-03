// nabbar.js
fetch("partials/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;

        // Tunggu sampai header sudah di-render
        const header = document.getElementById("site-header");
        let lastScroll = window.pageYOffset || document.documentElement.scrollTop;

        setTimeout(() => {
            window.addEventListener("scroll", () => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                // Scroll ke bawah
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.classList.add("hide-header");
                }
                // Scroll ke atas
                else if (currentScroll < lastScroll) {
                    header.classList.remove("hide-header");
                }

                lastScroll = currentScroll;
            });
        }, 100); // Sedikit delay agar header dipastikan ada
        

        // Highlight nav aktif
        const currentPath = window.location.pathname.split("/").pop();
        document.querySelectorAll(".nav-link").forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath || (href === "index.html" && currentPath === "")) {
                link.classList.add("active-link");
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });




// footer.js
fetch("partials/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;

        // Tambahkan event listener untuk smooth scroll ke atas
        const backToTopButton = document.getElementById("back-to-top");
        if (backToTopButton) {
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    })
    .catch(err => console.error('Error loading footer:', err));


// script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Global JavaScript berhasil dimuat!');

    // --- Fungsionalitas Umum (berlaku untuk semua halaman jika elemen ada) ---

    // Efek hover untuk semua tombol .btn
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease-in-out';
        });
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1.0)';
        });
    });

    // Animasi fade-in untuk hero text pada setiap halaman
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300); // Sedikit delay agar terlihat
    }

    // --- Fungsionalitas Spesifik Halaman ---

    // Fungsionalitas untuk index.html
    if (document.title === 'Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk index.html aktif.');

        // Efek hover pada gambar intro
        const introImage = document.querySelector('.intro-image img');
        if (introImage) {
            introImage.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.08)';
                this.style.transition = 'transform 0.3s ease-in-out';
            });
            introImage.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
            });
        }

        // Efek hover pada semua kartu berita dan galeri
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            card.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

    // Fungsionalitas untuk kontak.html
    if (document.title === 'Kontak Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk kontak.html aktif.');

        // Efek hover pada setiap kontak-item
        const kontakItems = document.querySelectorAll('.kontak-item');
        kontakItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 6px 10px rgba(0,0,0,0.15)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            item.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
                this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
        });

        // Efek hover pada gambar ikon di kontak-item
        const kontakItemImages = document.querySelectorAll('.kontak-item img');
        kontakItemImages.forEach(img => {
            img.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.15)';
                this.style.transition = 'transform 0.3s ease-in-out';
            });
            img.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
            });
        });
    }

    // Fungsionalitas untuk perangkat-desa.html
    if (document.title === 'Perangkat Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk perangkat-desa.html aktif.');

        // Efek hover pada kartu perangkat desa
        const perangkatCards = document.querySelectorAll('.perangkat-desa .card');
        perangkatCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            card.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

    // Fungsionalitas untuk peta-desa.html
    if (document.title === 'Peta Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk peta-desa.html aktif.');

        // Efek hover pada peta-text
        const petaText = document.querySelector('.peta-text');
        if (petaText) {
            petaText.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            petaText.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });
        }

        // Efek hover pada map-container
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            mapContainer.addEventListener('mouseover', function() {
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                this.style.transition = 'box-shadow 0.3s ease-in-out';
            });
            mapContainer.addEventListener('mouseout', function() {
                this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            });
        }
    }

    // Fungsionalitas untuk potensi-desa.html
    if (document.title === 'Potensi Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk potensi-desa.html aktif.');

        // Efek hover pada gambar potensi
        const potensiImages = document.querySelectorAll('.potensi-desa img');
        potensiImages.forEach(img => {
            img.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.03)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.25)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            img.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
                this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
            });
        });

        // Efek hover pada wrapper potensi-desa
        const potensiWrapper = document.querySelector('.potensi-desa');
        if (potensiWrapper) {
            potensiWrapper.addEventListener('mouseover', function() {
                this.style.boxShadow = '0 15px 50px rgba(0,0,0,0.2)';
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'all 0.3s ease-in-out';
            });
            potensiWrapper.addEventListener('mouseout', function() {
                this.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
                this.style.transform = 'translateY(0)';
            });
        }
    }

    // Fungsionalitas untuk produk-desa.html
    if (document.title === 'Produk Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk produk-desa.html aktif.');

        // Efek hover pada kartu produk
        const produkCards = document.querySelectorAll('.produk-card');
        produkCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.03)';
                this.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                this.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out';
            });
            card.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        });
    }

    // Fungsionalitas untuk sejarah.html
    if (document.title === 'Sejarah Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk sejarah.html aktif.');

        // Efek hover pada timeline-item
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 6px 10px rgba(0,0,0,0.15)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            item.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            });
        });

        // Efek hover pada highlight (tahun)
        const highlights = document.querySelectorAll('.highlight');
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = '#FFD966'; // Warna hover
                this.style.color = '#184f28'; // Warna teks hover
                this.style.transition = 'all 0.3s ease-in-out';
            });
            highlight.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
                this.style.backgroundColor = '#198754'; // Warna asli
                this.style.color = 'white'; // Warna teks asli
            });
        });
    }

    // Fungsionalitas untuk struktur-organisasi.html
    if (document.title === 'Struktur Organisasi Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk struktur-organisasi.html aktif.');

        // Efek hover pada gambar skema
        const skemaImage = document.querySelector('.struktur-organisasi-image img');
        if (skemaImage) {
            skemaImage.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            skemaImage.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });
        }

        // Efek hover pada text wrapper
        const textWrapper = document.querySelector('.struktur-organisasi-text-wrapper');
        if (textWrapper) {
            textWrapper.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                this.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';
            });
            textWrapper.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            });
        }
    }

    // Fungsionalitas untuk visi-misi.html
    if (document.title === 'Visi Misi Desa Pulosari') {
        console.log('Fungsionalitas spesifik untuk visi-misi.html aktif.');

        // Efek hover pada gambar misi
        const misiImage = document.querySelector('.misi-image img');
        if (misiImage) {
            misiImage.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.08)';
                this.style.transition = 'transform 0.3s ease-in-out';
            });
            misiImage.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1.0)';
            });
        }

        // Efek hover pada accordion items (opsional, Bootstrap sudah punya efek default)
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.addEventListener('mouseover', function() {
                this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                this.style.transition = 'box-shadow 0.2s ease-in-out';
            });
            item.addEventListener('mouseout', function() {
                this.style.boxShadow = 'none';
            });
        });
    }

    // Fungsionalitas untuk navbar.html (jika digunakan sebagai include atau bagian dari halaman lain)
    // Karena navbar.html tidak memiliki tag <body> atau <html> lengkap,
    // fungsionalitasnya akan bergantung pada halaman yang menggunakannya.
    // Namun, jika Anda ingin menambahkan efek khusus pada navbar itu sendiri,
    // pastikan elemen navbar memiliki ID atau kelas yang unik.
    const navbarCustom = document.querySelector('.navbar-custom');
    if (navbarCustom) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scroll down
                navbarCustom.style.top = '-80px'; // Sembunyikan navbar
            } else {
                // Scroll up
                navbarCustom.style.top = '0'; // Tampilkan navbar
            }
            navbarCustom.style.transition = 'top 0.3s ease-in-out';
            lastScrollTop = scrollTop;
        });
    }
});
