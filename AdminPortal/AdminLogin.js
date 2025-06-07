const togglePassword = document.getElementById('togglePassword');
const password = document.getElementById('password');
        
togglePassword.addEventListener('click', function() {
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
        
loginForm.addEventListener('submit', function(e) {
e.preventDefault();
            
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
        
setTimeout(() => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
                    
setTimeout(() => {
    window.location.href = 'admin-dashboard.html';
}, 1500);
} else {
errorMessage.style.display = 'block';
loginBtn.disabled = false;
loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';

document.getElementById('password').value = '';
document.getElementById('password').focus();
}
}, 1000);
});
        
document.getElementById('username').addEventListener('input', hideError);
document.getElementById('password').addEventListener('input', hideError);
        
function hideError() {
    errorMessage.style.display = 'none';
}