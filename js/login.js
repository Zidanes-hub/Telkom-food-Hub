/* ===================================
   LOGIN.JS - Telkom Food Hub
   Modul untuk autentikasi login
   =================================== */

// Menunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
});

/**
 * Inisialisasi form login
 */
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Event listener untuk form submit
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Event listener untuk input validation real-time
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
    }

    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
    }
}

/**
 * Handler untuk proses login
 * @param {Event} e - Event object dari form submit
 */
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Validasi input
    if (!validateInputs(email, password)) {
        return;
    }

    // Simulasi loading state
    showLoadingState(true);

    // Simulasi proses login (nanti bisa diganti dengan API call)
    setTimeout(() => {
        processLogin(email, password);
    }, 1000);
}

/**
 * Validasi semua input
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 * @returns {boolean} - Status validasi
 */
function validateInputs(email, password) {
    let isValid = true;

    // Validasi email
    if (!email) {
        showError('email', 'Email harus diisi!');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Format email tidak valid!');
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
    } else {
        clearError('password');
    }

    return isValid;
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
 * Validasi email saat blur
 */
function validateEmail() {
    const email = document.getElementById('email').value.trim();

    if (email && !isValidEmail(email)) {
        showError('email', 'Format email tidak valid!');
    } else {
        clearError('email');
    }
}

/**
 * Validasi password saat blur
 */
function validatePassword() {
    const password = document.getElementById('password').value;

    if (password && password.length < 6) {
        showError('password', 'Kata sandi minimal 6 karakter!');
    } else {
        clearError('password');
    }
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
    const originalText = submitButton.textContent;

    if (isLoading) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';
    } else {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

/**
 * Proses login (simulasi - nanti bisa diganti dengan API call)
 * @param {string} email - Email pengguna
 * @param {string} password - Password pengguna
 */
function processLogin(email, password) {
    // Simulasi autentikasi
    // Nanti bisa diganti dengan API call ke backend

    // Contoh: Simpan data user ke localStorage
    const userData = {
        email: email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true
    };

    localStorage.setItem('telkomFoodHubUser', JSON.stringify(userData));

    // Tampilkan pesan sukses
    showSuccessMessage('Login berhasil! Mengalihkan...');

    // Redirect ke halaman index-logged
    setTimeout(() => {
        window.location.href = 'index-logged.html';
    }, 1500);
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
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Hapus alert setelah 3 detik
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

/**
 * Cek apakah user sudah login
 * Bisa dipanggil dari halaman lain untuk proteksi
 */
function checkLoginStatus() {
    const userData = localStorage.getItem('telkomFoodHubUser');

    if (userData) {
        const user = JSON.parse(userData);
        return user.isLoggedIn;
    }

    return false;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('telkomFoodHubUser');
    window.location.href = 'login.html';
}

// Export functions untuk digunakan di file lain (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkLoginStatus,
        logout
    };
}