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

  window.location.href = "../Certification/Certificate.html";
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

  window.location.href = "../Certification/Certificate.html";
}


