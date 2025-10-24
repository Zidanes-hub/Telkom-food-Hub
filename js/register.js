/* ===================================
   REGISTER.JS - Telkom Food Hub
   Modul untuk registrasi akun baru
   =================================== */

// Menunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    initializeRegister();
});

/**
 * Inisialisasi form registrasi
 */
function initializeRegister() {
    const registerForm = document.getElementById('registerForm');
    const namaInput = document.getElementById('nama');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Event listener untuk form submit
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Event listener untuk validasi real-time
    if (namaInput) {
        namaInput.addEventListener('blur', validateNama);
    }

    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', checkPasswordMatch);
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }
}

/**
 * Handler untuk proses registrasi
 * @param {Event} e - Event object dari form submit
 */
function handleRegister(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validasi semua input
    if (!validateAllInputs(nama, email, password, confirmPassword)) {
        return;
    }

    // Simulasi loading state
    showLoadingState(true);

    // Simulasi proses registrasi (nanti bisa diganti dengan API call)
    setTimeout(() => {
        processRegister(nama, email, password);
    }, 1000);
}

/**
 * Validasi semua input
 * @param {string} nama - Nama lengkap
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @param {string} confirmPassword - Konfirmasi password
 * @returns {boolean} - Status validasi
 */
function validateAllInputs(nama, email, password, confirmPassword) {
    let isValid = true;

    // Validasi nama
    if (!nama) {
        showError('nama', 'Nama lengkap harus diisi!');
        isValid = false;
    } else if (nama.length < 3) {
        showError('nama', 'Nama minimal 3 karakter!');
        isValid = false;
    } else {
        clearError('nama');
    }

    // Validasi email
    if (!email) {
        showError('email', 'Email harus diisi!');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Format email tidak valid!');
        isValid = false;
    } else if (isEmailRegistered(email)) {
        showError('email', 'Email sudah terdaftar!');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validasi password
    if (!password) {
        showError('password', 'Kata sandi harus diisi!');
        isValid = false;
    } else if (password.length < 6) {
        showError('password', 'Kata sandi minimal 6 karakter!');
        isValid = false;
    } else if (!isStrongPassword(password)) {
        showError('password', 'Kata sandi harus mengandung huruf dan angka!');
        isValid = false;
    } else {
        clearError('password');
    }

    // Validasi konfirmasi password
    if (!confirmPassword) {
        showError('confirmPassword', 'Konfirmasi kata sandi harus diisi!');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Kata sandi tidak cocok!');
        isValid = false;
    } else {
        clearError('confirmPassword');
    }

    return isValid;
}

/**
 * Validasi nama saat blur
 */
function validateNama() {
    const nama = document.getElementById('nama').value.trim();

    if (!nama) {
        showError('nama', 'Nama lengkap harus diisi!');
    } else if (nama.length < 3) {
        showError('nama', 'Nama minimal 3 karakter!');
    } else {
        clearError('nama');
    }
}

/**
 * Validasi email saat blur
 */
function validateEmail() {
    const email = document.getElementById('email').value.trim();

    if (!email) {
        showError('email', 'Email harus diisi!');
    } else if (!isValidEmail(email)) {
        showError('email', 'Format email tidak valid!');
    } else if (isEmailRegistered(email)) {
        showError('email', 'Email sudah terdaftar!');
    } else {
        clearError('email');
    }
}

/**
 * Validasi password saat blur
 */
function validatePassword() {
    const password = document.getElementById('password').value;

    if (!password) {
        showError('password', 'Kata sandi harus diisi!');
    } else if (password.length < 6) {
        showError('password', 'Kata sandi minimal 6 karakter!');
    } else if (!isStrongPassword(password)) {
        showError('password', 'Kata sandi harus mengandung huruf dan angka!');
    } else {
        clearError('password');
    }
}

/**
 * Validasi konfirmasi password saat blur
 */
function validateConfirmPassword() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!confirmPassword) {
        showError('confirmPassword', 'Konfirmasi kata sandi harus diisi!');
    } else if (password !== confirmPassword) {
        showError('confirmPassword', 'Kata sandi tidak cocok!');
    } else {
        clearError('confirmPassword');
    }
}

/**
 * Cek kecocokan password secara real-time
 */
function checkPasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (confirmPassword && password !== confirmPassword) {
        showError('confirmPassword', 'Kata sandi tidak cocok!');
    } else if (confirmPassword && password === confirmPassword) {
        clearError('confirmPassword');
    }
}

/**
 * Validasi format email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} - Status validasi email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Cek apakah email sudah terdaftar
 * @param {string} email - Email yang akan dicek
 * @returns {boolean} - Status email terdaftar
 */
function isEmailRegistered(email) {
    // Ambil data users dari localStorage
    const users = getRegisteredUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

/**
 * Validasi kekuatan password
 * @param {string} password - Password yang akan divalidasi
 * @returns {boolean} - Status kekuatan password
 */
function isStrongPassword(password) {
    // Password harus mengandung huruf dan angka
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasLetter && hasNumber;
}

/**
 * Menampilkan pesan error
 * @param {string} fieldId - ID field yang error
 * @param {string} message - Pesan error
 */
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentElement.querySelector('.error-message');

    // Tambahkan class error ke field
    field.classList.add('is-invalid');

    // Jika error message belum ada, buat
    if (!errorDiv) {
        const error = document.createElement('div');
        error.className = 'error-message text-danger small mt-1';
        error.textContent = message;
        field.parentElement.appendChild(error);
    } else {
        errorDiv.textContent = message;
    }
}

/**
 * Menghapus pesan error
 * @param {string} fieldId - ID field yang akan dihapus errornya
 */
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorDiv = field.parentElement.querySelector('.error-message');

    field.classList.remove('is-invalid');

    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Menampilkan loading state
 * @param {boolean} isLoading - Status loading
 */
function showLoadingState(isLoading) {
    const submitButton = document.querySelector('button[type="submit"]');

    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
    } else {
        submitButton.disabled = false;
        submitButton.textContent = 'Daftar';
    }
}

/**
 * Ambil daftar user yang sudah terdaftar
 * @returns {Array} - Array berisi data users
 */
function getRegisteredUsers() {
    const usersData = localStorage.getItem('telkomFoodHubUsers');
    return usersData ? JSON.parse(usersData) : [];
}

/**
 * Simpan user baru ke localStorage
 * @param {Object} userData - Data user yang akan disimpan
 */
function saveUser(userData) {
    const users = getRegisteredUsers();
    users.push(userData);
    localStorage.setItem('telkomFoodHubUsers', JSON.stringify(users));
}

/**
 * Proses registrasi (simulasi - nanti bisa diganti dengan API call)
 * @param {string} nama - Nama lengkap
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 */
function processRegister(nama, email, password) {
    // Buat objek user baru
    const newUser = {
        id: generateUserId(),
        nama: nama,
        email: email,
        password: password, // Dalam implementasi real, password harus di-hash!
        createdAt: new Date().toISOString()
    };

    // Simpan user ke localStorage
    saveUser(newUser);

    // Tampilkan pesan sukses
    showSuccessMessage('Pendaftaran berhasil! Mengalihkan ke halaman login...');

    // Redirect ke halaman login
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

/**
 * Generate ID unik untuk user
 * @returns {string} - ID unik
 */
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Menampilkan pesan sukses
 * @param {string} message - Pesan sukses
 */
function showSuccessMessage(message) {
    showLoadingState(false);

    // Buat alert sukses
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '350px';
    alertDiv.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Hapus alert setelah 3 detik
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Export functions untuk digunakan di file lain (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isEmailRegistered,
        getRegisteredUsers
    };
}