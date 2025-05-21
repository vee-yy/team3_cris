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
  Swal.fire({
    title: 'Terms & Conditions',
    html: `
      <p>By proceeding, you agree to provide accurate information for this certificate request.</p>
      <div style="margin-top: 10px; text-align: left;">
        <input type="checkbox" id="termsCheckbox" />
        <label for="termsCheckbox"> I have read and agree to the Terms & Conditions</label>
      </div>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Proceed',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      if (!document.getElementById('termsCheckbox').checked) {
        Swal.showValidationMessage('You must agree to the terms before continuing.');
        return false;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const popup = document.getElementById('popupForm');
      popup.style.display = 'flex';
      document.getElementById('formTitle').innerText = `Register for ${type}`;
      document.getElementById('certificateType').value = type;

      document.querySelectorAll('.type-fields').forEach(div => {
        div.style.display = 'none';
      });

      if (type === 'Birth Certificate') {
        document.getElementById('birthFields').style.display = 'block';
      } else if (type === 'Marriage Certificate') {
        document.getElementById('marriageFields').style.display = 'block';
      } else if (type === 'Death Certificate') {
        document.getElementById('deathFields').style.display = 'block';
      } else if (type === 'Cenomar Certificate') {
        document.getElementById('cenomarFields').style.display = 'block';
      } else if (type === 'Cenodeath Certificate') {
        document.getElementById('cenodeathFields').style.display = 'block';
      }
    } else {
      // If the user cancels, reset and close
      closeForm();
    }
  });
}

