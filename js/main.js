/* --------------------------------------------------- */
/* Telkom Food Hub - main.js                           */
/* --------------------------------------------------- */

// Tunggu sampai seluruh halaman HTML selesai dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {

    // --- SCRIPT UNTUK HAMBURGER MENU ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    // Pastikan elemennya ada sebelum menambahkan event listener
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle class 'active' pada menu navigasi
            navMenu.classList.toggle('active');
        });
    }


    // --- SCRIPT UNTUK TANGGAL REAL-TIME ---
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


});