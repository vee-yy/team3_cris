const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
});

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loginBtn = document.getElementById('loginBtn');

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "Admin@123"
};

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const passwordValue = document.getElementById('password').value;

    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    if (username === ADMIN_CREDENTIALS.username && passwordValue === ADMIN_CREDENTIALS.password) {
        successMessage.style.display = 'block';
        successMessage.textContent = "Login successful! Redirecting...";

        sessionStorage.setItem("isAdmin", "true");

        setTimeout(() => {
            window.location.href = 'AdminDashboard.html';
        }, 1000);

        return; 
    }

    errorMessage.style.display = 'block';
    errorMessage.textContent = "Incorrect username or password.";
    loginBtn.disabled = false;
    loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';

    document.getElementById('password').value = '';
    document.getElementById('password').focus();
});

document.getElementById('username').addEventListener('input', hideError);
document.getElementById('password').addEventListener('input', hideError);

function hideError() {
    errorMessage.style.display = 'none';
}
