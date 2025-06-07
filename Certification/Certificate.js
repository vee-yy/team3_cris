// Functions for searching and filtering cards and table rows
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('.searchInput');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();

    function highlightText(element, query) {
      if (!query) {
          element.innerHTML = element.textContent;
        return;
      }

    const text = element.textContent;
    const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');

        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
  }

// Search & highlight cards
    const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        const cardText = card.innerText.toLowerCase();
        if (cardText.includes(query)) {
          card.style.display = 'flex';

 // Highlight matches inside the card's h2 (or you can choose whole card)
    const title = card.querySelector('h2');
        if (title) highlightText(title, query);
        } else {
        card.style.display = 'none';

// Remove highlights if hidden
    const title = card.querySelector('h2');
        if (title) highlightText(title, '');
        }
      });

// Search & highlight rows in table
const rows = document.querySelectorAll('#registrationTableBody tr');
   rows.forEach(row => {
const rowText = row.innerText.toLowerCase();
  if (rowText.includes(query)) {
    row.style.display = '';
const nameCell = row.querySelectorAll('td')[1];
  if (nameCell) {
      highlightText(nameCell, query);
   }
row.querySelectorAll('td').forEach((td, i) => {
   if (i !== 1) {
     td.innerHTML = td.textContent;
     }
   });
  } else {
row.style.display = 'none';
row.querySelectorAll('td').forEach(td => {
td.innerHTML = td.textContent;
          });
        }
      });
    });
 }
});

// Function to open the home, about, and contact popups

function openHomePopup() {
  Swal.fire({ 
    icon: 'info', 
    title: 'Home', 
    text: 'This is the Home section.' });
}

function openAboutPopup() {
  Swal.fire({ icon: 'info', title: 'About Us', text: 'This is the About Us section.' });
}

function openContactPopup() {
  Swal.fire({ icon: 'info', title: 'Contact Us', text: 'This is the Contact Us section.' });
}

function openOtherCertificateAlert(){
  Swal.fire({
    icon: 'info',
    title: 'Other Certificate',
    text: 'Contact us Via email cris.support@gmail.com.',
    confirmButtonText: 'OK',
    confirmButtonColor: '#3b82f6'
  })
}

// Function for sweet alert for every card click

function openForm(type) {
  Swal.fire({
    title: 'Terms & Conditions',
    html: `<div style="text-align: left;">
      <p style="margin-bottom: 1rem;">By proceeding, you agree to:</p>
      <ul style="margin-left: 1.2rem; padding-left: 1rem; list-style-type: disc;">
        <li style="margin-bottom: 0.5rem;">Provide accurate and truthful information</li>
        <li style="margin-bottom: 0.5rem;">Upload authentic documents only</li>
        <li style="margin-bottom: 0.5rem;">Pay applicable fees</li>
        <li><strong>Allow processing time of 3–10 business days</strong></li>
      </ul>
      <div style="margin-top: 1.5rem;">
        <input type="checkbox" id="termsCheckbox" style="margin-right: 0.5rem;" />
        <label for="termsCheckbox">I have read and agree to the Terms & Conditions</label>
      </div>
    </div>`,
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Agree & Continue',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#3b82f6',
    width: '600px',
    preConfirm: () => {
      const checkbox = document.getElementById('termsCheckbox');
      if (!checkbox || !checkbox.checked) {
        Swal.showValidationMessage('You must agree to the terms before continuing.');
        return false;
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      showPopupForm(type);
    } else {
      closeForm();
    }
  });
}

// Function to show the popup form for certificate registration
function showPopupForm(type) {
  const popup = document.getElementById('popupForm');
  if (!popup) return;

  popup.style.display = 'flex';
  const formTitle = document.getElementById('formTitle');
  if (formTitle) formTitle.innerText = `Register for ${type}`;

  const certTypeInput = document.getElementById('certificateType');
  if (certTypeInput) certTypeInput.value = type;

  document.querySelectorAll('.type-fields').forEach(div => div.style.display = 'none');

  const fieldMap = {
    'Birth Certificate': 'birthFields',
    'Marriage Certificate': 'marriageFields',
    'Death Certificate': 'deathFields',
    'Cenomar Certificate': 'cenomarFields',
    'Cenodeath Certificate': 'cenodeathFields',
  };

  const showId = fieldMap[type];
  const section = document.getElementById(showId);
  if (section) section.style.display = 'block';

  resetFormAndStepper();
}

function closeForm() {
  const popup = document.getElementById('popupForm');
  if (popup) popup.style.display = 'none';
  certificateForm?.reset();
  resetFormAndStepper();
}

const form = document.getElementById('certificateForm');
const steps = document.querySelectorAll('.form-step');

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const downloadBtn = document.getElementById('downloadBtn');

let currentStep = 0;

// Map certificate type to its fields container id
const sectionMap = {
  'Birth Certificate': 'birthFields',
  'Marriage Certificate': 'marriageFields',
  'Death Certificate': 'deathFields',
  'Cenomar Certificate': 'cenomarFields',
  'Cenodeath Certificate': 'cenodeathFields'
};

//Function to reset the form and stepper
function showStep(step) {
  steps.forEach((el, idx) => {
    el.style.display = idx === step ? 'block' : 'none';
  });
  prevBtn.disabled = step === 0;
  nextBtn.style.display = step === steps.length - 1 ? 'none' : 'inline-block';
  form.querySelector('button[type="submit"]').style.display = step === steps.length - 1 ? 'inline-block' : 'none';
  downloadBtn.style.display = step === steps.length - 1 ? 'inline-block' : 'none';
}

// Validate all visible inputs in the active certificate type section
function validateStep1() {
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return false;

  const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
  for (const input of inputs) {
    if (!input.value.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: `Please fill out the required field: ${input.placeholder || input.name}`,
        confirmButtonColor: '#3b82f6'
      });
      input.focus();
      return false;
    }
  }
  return true;
}

//Generate the summary of inputs for the selected certificate type and download as PDF basta ayon jusko po
function generateSummary() {
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  const inputs = section.querySelectorAll('input, textarea, select');
  let summaryHTML = `<h3>${certType} - Review Your Inputs</h3>`;

  inputs.forEach(input => {
    const label = input.getAttribute('placeholder') || input.name || input.id || 'Field';
    const value = input.value.trim() || '<em>Not provided</em>';
    summaryHTML += `
      <div class="review-item">
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </div>`;
  });

  document.getElementById('reviewSummary').innerHTML = summaryHTML;
}

nextBtn.addEventListener('click', () => {
  if (!validateStep1()) return;

  generateSummary();
  currentStep = 1;
  showStep(currentStep);
});

prevBtn.addEventListener('click', () => {
  currentStep = 0;
  showStep(currentStep);
});

downloadBtn.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  doc.setFontSize(14);
  doc.text('Certificate Registration Summary', 10, 10);
  doc.text(`Certificate Type: ${certType}`, 10, 20);

  let y = 30;
  section.querySelectorAll('input, textarea, select').forEach(input => {
    const label = input.getAttribute('placeholder') || input.name || input.id || 'Field';
    const value = input.value.trim() || 'Not provided';
    doc.text(`${label}: ${value}`, 10, y);
    y += 10;
  });

  doc.save('registration-summary.pdf');
});

let registrationCount = 0;

form.addEventListener('submit', e => {
  e.preventDefault();

// Increment count each time form is submitted
  registrationCount++;

// Format ID with leading zeros, e.g., REG-00001
  const idNumber = `REG-${String(registrationCount).padStart(5, '0')}`;

  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  const firstName = section.querySelector('input[placeholder="First Name"]')?.value.trim() || '';
  const lastName = section.querySelector('input[placeholder="Last Name"]')?.value.trim() || '';
  const middleInitial = section.querySelector('input[placeholder="Middle Initial"]')?.value.trim() || '';
  const suffix = section.querySelector('input#suffix')?.value.trim() || '';

  const fullName = [firstName, middleInitial && middleInitial + '.', lastName, suffix].filter(Boolean).join(' ').trim();

  const tableBody = document.querySelector('#registrationTableBody');
  if (!tableBody) return;

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${idNumber}</td>
    <td>${fullName}</td>
    <td>${certType}</td>
    <td>Pending</td>
  `;
  tableBody.appendChild(newRow);

  Swal.fire({
    icon: 'success',
    title: 'Thank you for your cooperation!',
    text: 'Kindly check your email to verify the payment and updates of your registration.',
    confirmButtonColor: '#3b82f6'
  }).then(() => {
    closeForm();

  });
});

//First AAAAAAAAAAARRGGHHH
showStep(currentStep);


async function downloadPDF() {
  const certType = document.getElementById('certificateType').value;
  const sectionMap = {
    'Birth Certificate': 'birthFields',
    'Marriage Certificate': 'marriageFields',
    'Death Certificate': 'deathFields',
    'Cenomar Certificate': 'cenomarFields',
    'Cenodeath Certificate': 'cenodeathFields'
  };
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);

  if (!section) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Certificate Registration Summary', 10, 10);

  let y = 20;
  section.querySelectorAll('input, textarea').forEach(input => {
    const label = input.getAttribute('placeholder') || input.name;
    const value = input.value.trim();
    doc.text(`${label}: ${value}`, 10, y);
    y += 10;
  });

  doc.save('registration-summary.pdf');
}


