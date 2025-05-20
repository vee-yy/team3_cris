function SignUp() {
    window.location.href = "Certificate/Certificate.html";
}
function LogIn() {
    window.location.href = "Certificate/Certificate.html";
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


  