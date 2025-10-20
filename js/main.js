/* ============================================ */
/* LOGIKA PRELOADER                             */
/* ============================================ */

// JANGAN tambahkan "document.body.classList.add('loading');" di sini.

// Tunggu SEMUA aset (gambar, stylesheet, font) dimuat
window.onload = function() {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        // Tambahkan kelas tersembunyi untuk memicu fade-out
        preloader.classList.add('preloader-hidden');

        // Hapus kelas 'loading' dari body untuk mengembalikan scroll
        document.body.classList.remove('loading');

        // Hapus preloader sepenuhnya dari DOM setelah transisi selesai
        setTimeout(() => {
            preloader.remove();
        }, 500); // Sesuaikan ini dengan durasi transisi CSS
    }
};

// Opsional: Cadangan untuk menyembunyikan preloader setelah 5 detik jika window.onload tidak terpicu
setTimeout(function() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader.classList.add('preloader-hidden');
        document.body.classList.remove('loading');
        setTimeout(() => preloader.remove(), 500);
    }
}, 5000);

// Tunggu sampai seluruh halaman HTML selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // --- SCRIPT UNTUK HAMBURGER MENU ---
    // ============================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    // Pastikan elemennya ada sebelum menambahkan event listener
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle class 'active' pada menu navigasi
            navMenu.classList.toggle('active');
        });
    }


    // ============================================
    // --- SCRIPT UNTUK TANGGAL REAL-TIME ---
    // ============================================
    const tanggalElement = document.getElementById('tanggal-hari-ini');

    // Pastikan elemen tanggal ada di halaman
    if (tanggalElement) {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Jakarta' // Menentukan zona waktu WIB
        };
        const tanggalSekarang = new Date();
        const tanggalIndonesia = tanggalSekarang.toLocaleDateString('id-ID', options);
        tanggalElement.textContent = tanggalIndonesia;
    }

    // ============================================
    // --- SCRIPT UNTUK JAM ANALOG REAL-TIME ---
    // ============================================
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');

    function setClock() {
        const now = new Date();
        const seconds = now.getSeconds();
        const secondsDegrees = ((seconds / 60) * 360) + 90;
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

        const minutes = now.getMinutes();
        const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

        const hours = now.getHours();
        const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    // Periksa apakah elemen jam ada sebelum menjalankan
    if (hourHand && minuteHand && secondHand) {
        setClock();
        setInterval(setClock, 1000); // Update setiap detik
    }

    // ============================================
    // --- INTERSECTION OBSERVER UNTUK ANIMASI SCROLL-REVEAL ---
    // ============================================

    // Konfigurasi untuk Intersection Observer
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // Picu saat 15% elemen terlihat
        rootMargin: '0px 0px -50px 0px' // Picu 50px *sebelum* elemen benar-benar masuk viewport
    };

    // Fungsi callback saat elemen bersinggungan
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan class 'active' untuk memicu animasi CSS
                entry.target.classList.add('active');

                // Opsional: Berhenti mengamati setelah animasi (animasi satu kali)
                // Hapus komentar pada baris di bawah jika Anda ingin animasi hanya terpicu sekali
                // observer.unobserve(entry.target);
            }
        });
    };

    // Buat instance Intersection Observer
    const revealObserver = new IntersectionObserver(observerCallback, observerOptions);

    // ============================================
    // PROPOSAL #1: Kartu Outlet Makanan Unggulan
    // ============================================
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.classList.add('reveal');
        revealObserver.observe(card);
    });

    // ============================================
    // PROPOSAL #2: Kartu Langkah "Cara Pesan" (Berjenjang)
    // ============================================
    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => {
        item.classList.add('reveal');

        revealObserver.observe(item);
    });

    // ============================================
    // PROPOSAL #5: Kartu Profil (Muncul dari Samping)
    // ============================================
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
        revealObserver.observe(card);
    });


    // ============================================
    // PROPOSAL #4: Transisi Latar Belakang Header Sticky
    // ============================================
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero-main');

    if (header && heroSection) {
        const headerObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '-80px 0px 0px 0px'
        };

        const headerObserverCallback = (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        };

        const headerObserver = new IntersectionObserver(headerObserverCallback, headerObserverOptions);
        headerObserver.observe(heroSection);
    }
});