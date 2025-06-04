function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function SignUp() {
  const form = document.getElementById('signupForm');
  const fullName = form.querySelector('input[type="text"]').value.trim();
  const email = form.querySelector('input[type="email"]').value.trim();
  const password = form.querySelector('input[type="password"]').value.trim();

  if (!fullName || !email || !password) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Information',
      text: 'Please fill in all the required fields before signing up.',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!isValidEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonText: 'OK'
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    Swal.fire({
      icon: 'error',
      title: 'User Already Exists',
      text: 'This email is already registered. Please log in.',
      confirmButtonText: 'OK'
    });
    return;
  }

  users.push({ email, password, fullName });
  localStorage.setItem('users', JSON.stringify(users));

  Swal.fire({
    icon: 'success',
    title: 'Account Created',
    text: 'You can now log in with your credentials.',
    confirmButtonText: 'OK'
  }).then(() => {
    toggleForms(); // Switch to the login form
  });
}

function LogIn() {
  const form = document.getElementById('loginForm');
  const email = form.querySelector('input[type="email"]').value.trim();
  const password = form.querySelector('input[type="password"]').value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Information',
      text: 'Please fill in all the required fields before logging in.',
      confirmButtonText: 'OK'
    });
    return;
  }

  if (!isValidEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonText: 'OK'
    });
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    Swal.fire({
      icon: 'success',
      title: 'Welcome Back!',
      text: `Welcome, ${foundUser.fullName}!`,
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.href = "../Certification/Certificate.html"; // Redirect after login
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Login',
      text: 'This email or password is invalid. Sign up if you don\'t have an account yet.',
      confirmButtonText: 'OK'
    });
  }
}


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

document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', function () {
    const input = document.querySelector(this.getAttribute('toggle'));
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
  });
});


