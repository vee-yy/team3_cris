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

  // Adjust this path exactly as per your project structure & case sensitive
  window.location.href = "../Certification/Certificate.html";
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

  // Adjust this path exactly as per your project structure & case sensitive
  window.location.href = "../Certification/Certificate.html";
}

function toggleForms() {
  const signupBox = document.getElementById('signupBox');
  const loginBox = document.getElementById('loginBox');

  if (loginBox.style.display === 'none') {
    loginBox.style.display = 'block';
    signupBox.style.display = 'none';
  } else {
    loginBox.style.display = 'none';
    signupBox.style.display = 'block';
  }
}
