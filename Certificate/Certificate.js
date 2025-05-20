const searchInput = document.querySelector('.searchInput');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'flex' : 'none';
  });
});

function openForm(type) {
  const popup = document.getElementById('popupForm');
  popup.style.display = 'flex';
  document.getElementById('formTitle').innerText = `Register for ${type}`;
  document.getElementById('certificateType').value = type;

  document.querySelectorAll('.type-fields').forEach(div => {
    div.style.display = 'none';
  });

  if (type === 'Birth Certificate') {
    document.getElementById('birthFields').style.display = 'block';
  }

  else if (type === 'Marriage Certificate') {
    document.getElementById('marriageFields').style.display = 'block';
  } 

  else if (type === 'Death Certificate') {
    document.getElementById('deathFields').style.display = 'block';
  } 

  else if (type === 'Cenomar Certificate') {
    document.getElementById('deathFields').style.display = 'block';
  }

  else if (type === 'Cenodeath Certificate') {
    document.getElementById('cenodeathFields').style.display = 'block';
  }
}

function closeForm() {
  const popup = document.getElementById('popupForm');
  popup.style.display = 'none';
  document.getElementById('certificateForm').reset();
}

document.getElementById('certificateForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const visibleFields = document.querySelector(".type-fields[style*='display: block']");
  const inputs = visibleFields.querySelectorAll("input");

  let isValid = true;

  inputs.forEach(input => {
    input.style.border = "";
    if (input.value.trim() === "") {
      input.style.border = "2px solid red";
      isValid = false;
    }
  });

  if (!isValid) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Form",
      text: "Please fill in all required fields."
    });
    return;
  }

  Swal.fire({
    icon: "success",
    title: "Submitted!",
    text: "Your form has been submitted successfully.",
    timer: 2000,
    showConfirmButton: false
  });

  document.getElementById("certificateForm").reset();
  closeForm();
});
