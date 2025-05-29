// Search filtering for certificate cards
const searchInput = document.querySelector('.searchInput');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
  });
});

function openHomePopup() {
  Swal.fire({ icon: 'info', title: 'Home', text: 'This is the Home section.' });
}

function openAboutPopup() {
  Swal.fire({ icon: 'info', title: 'About Us', text: 'This is the About Us section.' });
}

function openContactPopup() {
  Swal.fire({ icon: 'info', title: 'Contact Us', text: 'This is the Contact Us section.' });
}

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

function showStep(step) {
  steps.forEach((el, idx) => {
    el.style.display = idx === step ? 'block' : 'none';
  });
  prevBtn.disabled = step === 0;
  nextBtn.style.display = step === steps.length - 1 ? 'none' : 'inline-block';
  form.querySelector('button[type="submit"]').style.display = step === steps.length - 1 ? 'inline-block' : 'none';
  downloadBtn.style.display = step === steps.length - 1 ? 'inline-block' : 'none';
}

function validateStep1() {
  // Validate all visible inputs in the active certificate type section
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
    summaryHTML += `<p><strong>${label}:</strong> ${value}</p>`;
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

form.addEventListener('submit', e => {
  e.preventDefault();

  // Your existing submission logic here (adding row to table etc.)
  const certType = document.getElementById('certificateType').value;
  const sectionId = sectionMap[certType];
  const section = document.getElementById(sectionId);
  if (!section) return;

  // Extract name fields (adjust based on your fields)
  const firstName = section.querySelector('input[placeholder="First Name"]')?.value.trim() || '';
  const lastName = section.querySelector('input[placeholder="Last Name"]')?.value.trim() || '';
  const middleInitial = section.querySelector('input[placeholder="Middle Initial"]')?.value.trim() || '';
  const suffix = section.querySelector('input#suffix')?.value.trim() || '';

  const fullName = [firstName, middleInitial && middleInitial + '.', lastName, suffix].filter(Boolean).join(' ').trim();

  const tableBody = document.querySelector('#registrationTableBody');
  if (!tableBody) return;

  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${Date.now()}</td>
    <td>${fullName}</td>
    <td>${certType}</td>
    <td>Pending</td>
  `;
  tableBody.appendChild(newRow);

  Swal.fire({
    icon: 'success',
    title: 'Thank you for your cooperation!',
    text: 'We will send you an email of when you will be able to claim your certificate.',
    confirmButtonColor: '#3b82f6'
  }).then(() => {
    form.reset();
    currentStep = 0;
    showStep(currentStep);

    // Hide all certificate type fields
    Object.values(sectionMap).forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = 'none';
    });
  });
});

// Initialize first step visible on open
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

const certificateForm = document.getElementById('certificateForm');
if (certificateForm) {
  certificateForm.addEventListener('submit', function (e) {
    e.preventDefault();

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

    const firstName = section.querySelector('input[placeholder="First Name"]')?.value.trim() || '';
    const lastName = section.querySelector('input[placeholder="Last Name"]')?.value.trim() || '';
    const middleInitial = section.querySelector('input[placeholder="Middle Initial"]')?.value.trim() || '';
    const suffix = section.querySelector('input#suffix')?.value.trim() || '';
    const fullName = [firstName, middleInitial && middleInitial + '.', lastName, suffix].filter(Boolean).join(' ').trim();

    const tableBody = document.querySelector('#registrationTableBody');
    if (!tableBody) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${Date.now()}</td>
      <td>${fullName}</td>
      <td>${certType}</td>
      <td>Pending</td>
    `;
    tableBody.appendChild(newRow);

    Swal.fire({
      icon: 'success',
      title: 'Thank you for your cooperation!',
      text: 'We will send you an email of when you will be able to claim your certificate.',
      confirmButtonColor: '#3b82f6'
    }).then(() => {
      closeForm();
    });
  });
}

const popupForm = document.getElementById('popupForm');
if (popupForm) {
  popupForm.addEventListener('click', function (e) {
    if (e.target === this) closeForm();
  });
}
