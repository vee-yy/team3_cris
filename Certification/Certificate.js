// Search filtering for certificate cards
const searchInput = document.querySelector('.searchInput');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(query) ? 'flex' : 'none';
  });
});

// Popup form and registration logic
function openForm(type) {
  Swal.fire({
    title: 'Terms & Conditions',
    html: `
      <div style="text-align: left;">
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
      </div>
    `,
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

let registrationId = 1;
const certificateForm = document.getElementById('certificateForm');

if (certificateForm) {
  certificateForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const certType = document.getElementById('certificateType').value;
    let fullName = '';

    const fieldMap = {
      'Birth Certificate': 'birthFields',
      'Marriage Certificate': 'marriageFields',
      'Death Certificate': 'deathFields',
      'Cenomar Certificate': 'cenomarFields',
      'Cenodeath Certificate': 'cenodeathFields',
    };
    const sectionId = fieldMap[certType];
    const visibleSection = document.getElementById(sectionId);

    if (!visibleSection) return;

    const firstName = visibleSection.querySelector('input[placeholder="First Name"]')?.value.trim() || '';
    const lastName = visibleSection.querySelector('input[placeholder="Last Name"]')?.value.trim() || '';
    const middleInitial = visibleSection.querySelector('input[placeholder="Middle Initial"]')?.value.trim() || '';
    const suffix = visibleSection.querySelector('input#suffix')?.value.trim() || '';

    fullName = [firstName, middleInitial && middleInitial + '.', lastName, suffix].filter(Boolean).join(' ').trim();

    const tableBody = document.querySelector('#registrationTableBody');
    if (!tableBody) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <td>${registrationId}</td>
      <td>${fullName}</td>
      <td>${certType}</td>
      <td>Pending</td>
    `;
    tableBody.appendChild(newRow);
    registrationId++;

    // Show thank you SweetAlert, then close the popup and reset
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

let currentStep = 0;
const steps = document.querySelectorAll('.form-step');
const progressbarItems = document.querySelectorAll('#progressbar li');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => changeStep(-1));
  nextBtn.addEventListener('click', () => changeStep(1));
}

function showStep(step) {
  steps.forEach((stepDiv, idx) => {
    stepDiv.style.display = idx === step ? 'block' : 'none';
  });
  progressbarItems.forEach((li, idx) => {
    li.classList.toggle('active', idx <= step);
  });
  if (prevBtn) prevBtn.disabled = step === 0;
  if (nextBtn) nextBtn.style.display = step === steps.length - 1 ? 'none' : 'inline-block';
  const submitBtn = document.querySelector('.form-step:last-child button[type="submit"]');
  if (submitBtn) submitBtn.style.display = step === steps.length - 1 ? 'inline-block' : 'none';
}

function changeStep(n) {
  if (n === 1 && !validateStep(currentStep)) return;
  const newStep = Math.min(Math.max(currentStep + n, 0), steps.length - 1);
  if (newStep !== currentStep) {
    currentStep = newStep;
    showStep(currentStep);
  }
}

function validateStep(step) {
  const stepDiv = steps[step];
  if (!stepDiv) return false;
  const inputs = stepDiv.querySelectorAll('input[required], select[required], textarea[required]');
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

function resetFormAndStepper() {
  currentStep = 0;
  showStep(currentStep);
}
