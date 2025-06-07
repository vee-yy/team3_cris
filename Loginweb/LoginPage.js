<script>
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ✳️ Signup Validation (Used by PHP register.php)
function validateSignupForm() {
  const form = document.getElementById('signupForm');
  const fullName = form.querySelector('input[name="username"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();

  if (!fullName || !email || !password) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Information',
      text: 'Please fill in all the required fields before signing up.',
      confirmButtonText: 'OK'
    });
    return false; // Prevent form submission
  }

  if (!isValidEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonText: 'OK'
    });
    return false;
  }

  return true; // Allow form to submit to PHP
}

// ✳️ Login Validation (Used by PHP login.php)
function validateLoginForm() {
  const form = document.getElementById('loginForm');
  const email = form.querySelector('input[name="email"]').value.trim();
  const password = form.querySelector('input[name="password"]').value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Information',
      text: 'Please fill in all the required fields before logging in.',
      confirmButtonText: 'OK'
    });
    return false;
  }

  if (!isValidEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonText: 'OK'
    });
    return false;
  }

  return true; // Allow form to submit to PHP
}

// ✳️ Toggle login/signup forms
function toggleForms() {
  const signupBox = document.getElementById("signupBox");
  const loginBox = document.getElementById("loginBox");

  if (signupBox.style.display === "none") {
    signupBox.style.display = "block";
    loginBox.style.display = "none";
  } else {
    signupBox.style.display = "none";
    loginBox.style.display = "block";
  }
}

// ✳️ Forgot password popup
function forgotPassword() {
  Swal.fire({
    title: 'Forgot Password',
    input: 'email',
    inputLabel: 'Enter your email address',
    inputPlaceholder: 'your@example.com',
    showCancelButton: true,
    confirmButtonText: 'Send Reset Link',
    preConfirm: (email) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Email Sent!', 'Check your inbox for a reset link.', 'success');
    }
  });
}

// ✳️ Show/hide password
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', function () {
    const input = document.querySelector(this.getAttribute('toggle'));
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
});
</script>
