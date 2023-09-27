/ eslint-disable func-style /

const submitButton = document.querySelector('#submit');
const nameInput = document.querySelector('#name');
const ssnInput = document.querySelector('#ssn');
const numberInput = document.querySelector('#number');
const emailInput = document.querySelector('#email');
const empInput = document.querySelector('#emp');
const jobInput = document.querySelector('#job');
const salaryInput = document.querySelector('#salary');
const hobbiesInput = document.querySelector('#hobbies');
const departmentInput = document.querySelector('#department');
const addressInput = document.querySelector('#address');
const notesInput = document.querySelector('#notes');
const birthdateInput = document.querySelector('#birthdate');
const birthdateError = document.querySelector('#birthDateError');
const clearButton = document.querySelector('#clear');

empInput.value = generateRandomNumber();

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

function salaryToDecimal() {
  const salaryValue = salaryInput.value.trim();

  if (salaryValue !== '') {
    const decimalSalary = parseFloat(salaryValue);

    if (!isNaN(decimalSalary)) {
      salaryInput.value = decimalSalary.toFixed(2);
    }
  }
}

function birthdateValidation() {
  const originalDate = birthdateInput.value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(originalDate)) {
    return;
  }
  if (
    year.length !== 4 ) {
    return false;
  }
  const dateParts = originalDate.split(/[-/]/);

  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (!isNaN(parsedDate.getTime())) {
      birthdateInput.value = parsedDate.toISOString().split('T')[0];
    }
  }
}

function isValidDate(dateString) {
  const dateParts = dateString.split(/[-/]/);

  if (dateParts.length !== 3) {
    return false;
  }

  const [year, month, day] = dateParts;

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    year.length !== 4 ||
    month < 1 || month > 12 ||
    day < 1 || day > 31
  ) {
    return false;
  }

  return true;
}

function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (today.getDate() < birthDate.getDate()) {
    return age - 1;
  }
  return age;
}

function validateAge() {
  const birthdateInput = document.querySelector('#birthdate');
  const age = calculateAge(birthdateInput.value);
  const birthdateError = document.querySelector('#birthDateError');

  if (age < 18 || age > 100) {
    birthdateError.textContent = 'Age must be between 18 and 100 years.';
    return false;
  } else {
    return true;
  }
}

function checkField(fields,index,error) {
  if (fields.value.trim() === '') {
    document.querySelectorAll('.required')[index].textContent = error;
    fields.style.backgroundColor = '#ffcccc';
    isValid = false;
  }
  else {
    document.querySelectorAll('.required')[index].textContent = '';
    fields.style.backgroundColor = '#ffffff';
    return true;
  }
}
function isRequired() {
  const errorMessage = 'Required';
    checkField(nameInput,0,errorMessage);
    checkField(ssnInput,2,errorMessage);
    checkField(numberInput,4,errorMessage);
    checkField(emailInput,5,errorMessage);
    checkField(jobInput,6,errorMessage);
    checkField(salaryInput,8,errorMessage);
    checkField(hobbiesInput,9,errorMessage);
    checkField(departmentInput,7,errorMessage);
    checkField(addressInput,3,errorMessage);
    checkField(birthdateInput,1,errorMessage);
    validateGender();
    validateCommunication();

}

function validateGender() {
  const genderOptions = document.querySelectorAll('input[name="gender"]');
  let checked = false;

  genderOptions.forEach((option) => {
    if (option.checked) {
      checked = true;
    }
  });

  if (!checked) {
    document.querySelector('.required-gender').textContent = 'Required';
  } else {
    document.querySelector('.required-gender').textContent = ''; // Clear the error message if checked
  }

  return checked;
}

function validateCommunication() {
  const communicationOptions = document.querySelectorAll('input[name="communication[]"]');
  let checked = false;

  communicationOptions.forEach((option) => {
    if (option.checked) {
      checked = true;
    }
  });

  if (!checked) {
    document.querySelector('.required-communication').textContent = 'Required';
  } else {
    document.querySelector('.required-communication').textContent = ''; // Clear the error message if checked
  }

  return checked;
}


function allowedInputs(element, expression, index, message) {
  if (element.value.trim() === '') {
    document.querySelectorAll('.error')[index].textContent = '';
    return;
  }
  if (!element.value.match(expression)) {
    document.querySelectorAll('.error')[index].textContent = message;
    isValid = false;
  }
}

function checkAllowedInputs() {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const ssnRegex = /^[0-9-]*$/;
  const numberRegex = /^[0-9]*$/;
  const notexRegex = /^[a-zA-Z,.\s]*$/;
  const hobbiesRegex = /^[a-zA-Z\s,-]*$/;
  const addressRegex = /^[a-zA-Z0-9\s,-]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;
  const emailError = 'Accept gmail.com and yahoo.com only';
  const nameError = 'Alphabets and spaces only';
  const ssnError = 'Numbers and hyphens only';
  const numberError = 'Numbers only';
  const noteserror = 'Alphanumeric characters with spaces, commas, and dots only';
  const hobbiesError = 'Alphabets, spaces, commas and hyphens only';
  const addressError = 'Alphanumeric characters with spaces, commas and hyphens only';

  allowedInputs(nameInput, nameRegex, 0, nameError);
  allowedInputs(ssnInput, ssnRegex, 2, ssnError);
  allowedInputs(addressInput, addressRegex, 3, addressError);
  allowedInputs(numberInput, numberRegex, 4, numberError);
  allowedInputs(emailInput, emailRegex, 5, emailError);
  allowedInputs(jobInput, nameRegex, 6, nameError);
  allowedInputs(hobbiesInput, hobbiesRegex, 8, hobbiesError);
  allowedInputs(notesInput, notexRegex, 9, noteserror);
  validateAge();
  if (birthdateInput.value.trim() !== '' && !isValidDate(birthdateInput.value)) {
    birthdateError.textContent = 'Please enter a valid date.';
  }

}

function inputLength(element, minLength, maxLength, index, minLengthError, maxLengthError) {
  const value = element.value.trim();

  if (value.length === 0) {
    document.querySelectorAll('.error')[index].textContent = '';
    return true;
  }
  if (value.length < minLength || value.length > maxLength) {
    document.querySelectorAll('.error')[index].textContent = value.length < minLength ? minLengthError : maxLengthError;
    return false;
  }
  document.querySelectorAll('.error')[index].textContent = '';
  return true;
}

function checkInputLength() {
  inputLength(nameInput, 3, 20, 0, 'Name must be at least 3 characters long', 'Name cannot exceed 20 characters');
  inputLength(ssnInput, 7, 9, 2, 'This field must be at least 7 characters long', 'This field cannot exceed 9 characters');
  inputLength(numberInput, 7, 10, 4, 'number must be at least 7 characters long', 'number cannot exceed 10 characters');
  inputLength(emailInput, 10, 50, 5, 'Ivalid email', 'Name cannot exceed 50 characters');
  inputLength(jobInput, 3, 50, 6, 'job title must be 3 characters long', 'job title cannot exceed 50 characters');
  inputLength(salaryInput, 6, 13, 7, 'Salary must be at least 3 characters long', 'Salary cannot exceed 10 characters');
  inputLength(hobbiesInput, 3, 25, 8, 'Hobbie must be atleast 10 characters long', 'Hobbie cannot exceed 25 character');
}

function clearError() {
  const errorMessages = document.querySelectorAll('.error');

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
}

function clearForm() {
  const inputs = [
    nameInput, ssnInput, numberInput, emailInput, jobInput,
    salaryInput, hobbiesInput, addressInput,
    notesInput, birthdateInput
  ];

  departmentInput.selectedIndex = 0;
  departmentInput.style.backgroundColor = '#ffffff';
  inputs.forEach((input) => {
    input.value = '';
    input.style.backgroundColor = '#ffffff';
  });
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
  document.querySelectorAll('.required').forEach(error => error.textContent = '');
  document.querySelector('.required-gender').textContent = '';
  document.querySelector('.required-communication').textContent = '';
}

function validation() {
  const isRequiredResult = isRequired();

  checkInputLength();
  checkAllowedInputs();
  const errorMessages = document.querySelectorAll('.error');
  const hasErrors = Array.from(errorMessages).some(errorMessage => errorMessage.textContent !== '');

  return !hasErrors && isRequiredResult.every(result => result === true);
}

birthdateInput.addEventListener('blur', birthdateValidation);
salaryInput.addEventListener('blur', salaryToDecimal);
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearError();
  if (validation()) {
    window.location.href = 'response.html';
  }
});
clearButton.addEventListener('click', clearForm);
