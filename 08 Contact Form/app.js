const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successPopup = document.getElementById('successPopup');

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.style.borderColor = 'red';
}

function clearError(input, errorElement) {
  errorElement.textContent = '';
  input.style.borderColor = '#ccc';
}

function validateEmail(email) {
  const pattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return pattern.test(email);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = true;

  // Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, nameError, 'Name is required');
    valid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Email
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Enter a valid email');
    valid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // Message
  if (messageInput.value.trim().length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters');
    valid = false;
  } else {
    clearError(messageInput, messageError);
  }

  if (valid) {
    successPopup.style.display = 'block';
    form.reset();
    setTimeout(() => {
      successPopup.style.display = 'none';
    }, 3000);
  }
});

// Inline validation on input
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', () => {
    // Trigger submit with preventDefault just to reuse logic
    form.dispatchEvent(new Event('submit', { cancelable: true }));
  });
});
