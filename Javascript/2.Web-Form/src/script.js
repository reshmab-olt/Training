const form = document.querySelector('#webForm');
const submitButton = document.querySelector('#submit');
const clearButton = document.querySelector('#clear');
const nameInput = document.querySelector('#name');
const nameError = document.querySelector('#nameError');
const ssnInput = document.querySelector('#ssn');
const ssnError = document.querySelector('#ssnError');
const numberInput = document.querySelector('#number');
const phoneError = document.querySelector('#phoneError');
const emailInput = document.querySelector('#email');
const emailError = document.querySelector('#emailError');
const empInput = document.querySelector('#emp');
const idError = document.querySelector('#idError');
const jobInput = document.querySelector('#job');
const titleError = document.querySelector('#titleError');
const salaryInput = document.querySelector('#salary');
const salaryError = document.querySelector('#salaryError');
const hobbiesInput = document.querySelector('#hobbies');
const hobbiesError = document.querySelector('#hobbiesError');
const departmentInput = document.querySelector('#department');
const departmentError = document.querySelector('#department');
const addressInput = document.querySelector('#address');
const addressError = document.querySelector('#addressError');
const notesInput = document.querySelector('#notes');
const notesError = document.querySelector('#notesError');
const birthdateInput = document.querySelector('#birthdate');
const birthdateError = document.querySelector('#birthdateError');
const myForm = document.getElementById('myForm');
empInput.value = generateRandomNumber();
const gender = document.querySelector('input[name="gender"]:checked');
const communication = document.querySelectorAll('input[name="communication[]"]:checked');

function highlightEmptyField(input) {
  input.style.backgroundColor = 'lightcoral';
}
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}
function validateName() {
  const nameValue = nameInput.value.trim();
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!nameValue.match(nameRegex)) {
      nameError.textContent = 'Name can only contain alphabets and spaces.';
  } else if (nameValue.length < 3 || nameValue.length > 20) {
      nameError.textContent = 'Name must be between 3 and 20 characters.';
  } else {
      nameError.textContent = '';
  }
}

function ssNumber() {
  const ssnValue = ssnInput.value.trim();
  const ssnRegex = /^[0-9\-]+$/;

  if (!ssnValue.match(ssnRegex)) {
      ssnError.textContent = 'Social security number can only contain numbers and hyphens.';
  } else if (ssnValue.length < 7 || ssnValue.length > 9) {
      ssnError.textContent = 'Social security number should be between 7 and 9 characters.';
  } else {
      ssnError.textContent = '';
  }
}
function validateAddress() {
  const addressValue = addressInput.value.trim();
  const addressRegex = /^[a-zA-Z0-9\s,.-]+$/;

  if (!addressValue.match(addressRegex)) {
    addressError.textContent = 'Address can only contain alphanumeric characters, spaces, commas, and dots.';
  } else {
    addressError.textContent = ''; 
  }
}

function validateNumber() {
  const numberValue = numberInput.value.trim();
  const numberRegex = /^[0-9]+$/;

  if (!numberValue.match(numberRegex)) {
      phoneError.textContent = 'Phone number should be numbers only.';
  } else if (numberValue.length < 7 || numberValue.length > 10) {
      phoneError.textContent = 'Phone number should be between 7 and 10 digits';
  } else {
      phoneError.textContent = '';
  }
}
function validateEmail() {
  const emailValue = emailInput.value.trim();
  const allowedDomains = ['gmail.com', 'yahoo.com'];

  if (emailValue.length > 50) {
    emailError.textContent = 'Email should be less than 50 characters';
  } else {
    const domain = emailValue.split('@')[1];
    if (allowedDomains.includes(domain)) {
      emailError.textContent = '';
    } else {
      emailError.textContent = 'Email should have a domain of "gmail.com" or "yahoo.com" only.';
    }
  }
}

function validateJob() {
  const jobValue = jobInput.value.trim();
  const jobRegex = /^[a-zA-Z\s]+$/;

  if (!jobValue.match(jobRegex)) {
      titleError.textContent = 'Name can only contain alphabets and spaces.';
  } else if (jobValue.length < 3 || jobValue.length > 50) {
      titleError.textContent = 'Name must be between 3 and 20 characters.';
  } else {
      titleError.textContent = '';
  }
}
function validateSalary() {
  const salaryValue = salaryInput.value.trim();
  if (salaryValue.length < 3 || salaryValue.length > 10) {
      salaryError.textContent = 'Salary should be between 3 and 10 digits';
  } else {
      salaryError.textContent = '';
  }
}
function validateHobbies() {
  const hobbiesValue = hobbiesInput.value.trim();
  const hobbiesRegex = /^[a-zA-Z\s\-]+$/;

  if (!hobbiesValue.match(hobbiesRegex)) {
      hobbiesError.textContent = 'Name can only contain alphabets and spaces.';
  } else if (hobbiesValue.length < 3 || hobbiesValue.length > 25) {
      hobbiesError.textContent = 'Name must be between 3 and 20 characters.';
  } else {
      hobbiesError.textContent = '';
  }
}
function validateNotes() {
  const notesValue = notesInput.value.trim();
  const notesRegex = /^[a-zA-Z\s\-]+$/;

  if (!notesValue.match(notesRegex)) {
      notesError.textContent = 'Name can only contain alphabets and spaces.';
  } else {
      notesError.textContent = '';
  }
}
function convertToDecimal(inputElement) {
  const inputValue = inputElement.value.trim();
  if (inputValue !== '') {
    const decimalValue = parseFloat(inputValue);
    if (!isNaN(decimalValue)) {
      inputElement.value = decimalValue.toFixed(2);
    }
  }
}
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }

  return age;
}
nameInput.addEventListener('input', validateName);
ssnInput.addEventListener('input', ssNumber);
numberInput.addEventListener('input', validateNumber);
jobInput.addEventListener('input', validateJob);
hobbiesInput.addEventListener('input', validateHobbies);
addressInput.addEventListener('input', validateAddress);
emailInput.addEventListener('input', validateEmail);
notesInput.addEventListener('input', validateNotes);
salaryInput.addEventListener('blur', () => {
  validateSalary();
  convertToDecimal(salaryInput);
});

birthdateInput.addEventListener('blur', () => {
  const originalDate = birthdateInput.value.trim();

  if (birthdateInput.value.trim() !== '') {
    birthdateInput.style.backgroundColor = '#ffffff';
  }
  const dateParts = originalDate.split('-');

  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (!isNaN(parsedDate.getTime())) {
      birthdateInput.value = parsedDate.toISOString().split('T')[0];
    }
  }
});

function checkFields(event) {
  let hasEmptyField = false;
  const inputsToCheck = [
    { input: nameInput, error: nameError },
    { input: ssnInput, error: ssnError },
    { input: numberInput, error: phoneError },
    { input: emailInput, error: emailError },
    { input: empInput, error: idError },
    { input: jobInput, error: titleError },
    { input: salaryInput, error: salaryError },
    { input: addressInput, error: addressError },
    { input: hobbiesInput, error: hobbiesError },
    { input: departmentInput, error: departmentError }
  ];

  inputsToCheck.forEach(item => {
    if (item.input.value.trim() === '') {
      highlightEmptyField(item.input);
      item.error.textContent = 'This field is required.';
      hasEmptyField = true;
    } else {
      item.error.textContent = '';
    }
  });
  validateGender();
  validateCommunication();
  validateDepartment();
}
function resetInputBackground() {
  const inputsToReset = [
    nameInput,
    ssnInput,
    numberInput,
    emailInput,
    empInput,
    jobInput,
    salaryInput,
    addressInput,
    notesInput,
    hobbiesInput,
    departmentInput
  ];

  inputsToReset.forEach(input => {
    input.style.backgroundColor = '';
  });
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  checkFields(event);
  if (validateForm()) {
    window.location.href = "successful.html";
}
});


function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach(function (element) {
      element.textContent = "";
  });
}
function validateGender() {
  const genderOptions = document.querySelectorAll('input[name="gender"]');
  let checked = false;

  genderOptions.forEach(option => {
      if (option.checked) {
          checked = true;
      }
  });

  if (!checked) {
      document.getElementById("genderError").textContent = 'Please select a gender.';
  } else {
      document.getElementById("genderError").textContent = '';
  }
}

function validateCommunication() {
  const communicationOptions = document.querySelectorAll('input[name="communication[]"]');
  let checked = false;
  communicationOptions.forEach(option => {
      if (option.checked) {
          checked = true;
      }
  });

  if (!checked) {
      document.getElementById("communicationError").textContent = 'Please select at least one communication method.';
  } else {
      document.getElementById("communicationError").textContent = '';
  }
}

function validateDepartment() {
  const departmentSelect = document.getElementById("department");
  const selectedValue = departmentSelect.value;

  if (selectedValue === "") {
      document.getElementById("departmentError").textContent = 'Please select a department.';
  } else {
      document.getElementById("departmentError").textContent = '';
  }
}

document.querySelectorAll('input[name="gender"]').forEach(radio => {
  radio.addEventListener("change", validateGender);
});

document.querySelectorAll('input[name="communication[]"]').forEach(checkbox => {
  checkbox.addEventListener("change", validateCommunication);
});

document.getElementById("department").addEventListener("change", validateDepartment);

function validateForm() {
  checkFields();
  const errorElements = document.querySelectorAll(".error");
  let hasErrors = false;
  errorElements.forEach(function (element) {
    if (element.textContent !== "") {
      hasErrors = true;
    }
  });
  if (!hasErrors) {
    window.location.href = "successful.html";
  }
}

clearButton.addEventListener('click', () => {
  form.reset();
  clearForm();
  resetInputBackground();
});

