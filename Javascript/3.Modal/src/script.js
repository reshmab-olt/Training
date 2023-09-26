/* eslint-disable func-style */
const form = document.querySelector('#webForm');
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
const formDataArray = [];

empInput.value = generateRandomNumber();

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

// eslint-disable-next-line func-style
function birthdateValidation() {
  const originalDate = birthdateInput.value.trim();
  const dateParts = originalDate.split(/[-/]/);

  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (!isNaN(parsedDate.getTime())) {
      // eslint-disable-next-line prefer-destructuring
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

function decimalSalary() {
  const salaryValue = salaryInput.value.trim();

  if (salaryValue !== '') {
    const decimalSalary = parseFloat(salaryValue);

    if (!isNaN(decimalSalary)) {
      salaryInput.value = decimalSalary.toFixed(2);
    }
  }
}

function clearError() {
  const errorMessages = document.querySelectorAll('.error');

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
}

function checkField(field) {
  const value = field.value.trim();

  if (value === '') {
    field.style.backgroundColor = '#ffcccc';
    return false;
  } else {
    field.style.backgroundColor = '#ffffff';
    return true;
  }
}

function isRequired() {
  const validationResults = [

    checkField(nameInput),
    checkField(ssnInput),
    checkField(numberInput),
    checkField(emailInput),
    checkField(empInput),
    checkField(jobInput),
    checkField(salaryInput),
    checkField(hobbiesInput),
    checkField(departmentInput),
    checkField(addressInput),
    checkField(birthdateInput),
    validateGender(),
    validateCommunication()
  ];

  if (validationResults.includes(false)) {
    alert('Fill out the required fields');
  }
  return validationResults;
}

function validateGender() {
  const genderOptions = document.querySelectorAll('input[name="gender"]');

  let checked = false;

  genderOptions.forEach((option) => {
    if (option.checked) {
      checked = true;
    }
  });

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

  return checked;
}

function isAllowed(element, expression, index, message) {
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
  const hobbiesRegex = /^[a-zA-Z,-]*$/;
  const addressRegex = /^[a-zA-Z\s,-]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;
  const emailError = 'Accept gmail.com and yahoo.com only';
  const nameError = 'Alphabets and spaces only';
  const ssnError = 'Numbers and hyphens only';
  const numberError = 'Numbers only';
  const noteserror = 'Alphanumeric characters with spaces, commas, and dots only';
  const hobbiesError = 'Alphabets, commas, and hyphens only';
  const addressError = 'Alphabets, spaces, commas, and hyphens only';

  isAllowed(nameInput, nameRegex, 0, nameError);
  isAllowed(ssnInput, ssnRegex, 2, ssnError);
  isAllowed(addressInput, addressRegex, 3, addressError);
  isAllowed(numberInput, numberRegex, 4, numberError);
  isAllowed(emailInput, emailRegex, 5, emailError);
  isAllowed(jobInput, nameRegex, 6, nameError);
  isAllowed(hobbiesInput, hobbiesRegex, 8, hobbiesError);
  isAllowed(notesInput, notexRegex, 9, noteserror);
  validateAge();
  if (birthdateInput.value.trim() !== '' && !isValidDate(birthdateInput.value)) {
    birthdateError.textContent = 'Please enter a valid date.';
  }

}

function checkLength(element, minLength, maxLength, index, minLengthError, maxLengthError) {
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

function checkAllowedLength() {
  checkLength(nameInput, 3, 20, 0, 'Name must be at least 3 characters long', 'Name cannot exceed 20 characters');
  checkLength(ssnInput, 7, 9, 2, 'Must be at least 7 characters long', 'This field cannot exceed 9 characters');
  checkLength(numberInput, 7, 10, 4, 'number must be at least 7 characters long', 'number cannot exceed 10 characters');
  checkLength(emailInput, 10, 50, 5, 'Ivalid email', 'Name cannot exceed 50 characters');
  checkLength(jobInput, 3, 50, 6, 'Must be at least 3 characters long', 'job title cannot exceed 50 characters');
  checkLength(salaryInput, 6, 13, 7, 'Salary must be at least 3 characters long', 'Salary cannot exceed 10 characters');
  checkLength(hobbiesInput, 3, 25, 8, 'Must be at least 10 characters long', 'Hobbies cannot exceed 25 characters');
}

function validation() {
  const isRequiredResult = isRequired();

  checkAllowedLength();
  checkAllowedInputs();
  const errorMessages = document.querySelectorAll('.error');
  const hasErrors = Array.from(errorMessages).some(errorMessage => errorMessage.textContent !== '');

  return !hasErrors && isRequiredResult.every(result => result === true);
}

function displayData() {
  const modalBody = document.querySelector('.modal-body');

  modalBody.innerHTML = '';
  formDataArray.forEach((formData, index) => {
    modalBody.innerHTML = '';
    const communicationValues = Array.from(
      document.querySelectorAll('input[name="communication[]"]:checked')
    ).map(checkbox => checkbox.value).join(', ');
    const dataHtml = `
          <h4>Data ${index + 1}</h4>
          <p>Name         : ${formData.name}</p>
          <p>Gender       : ${formData.gender}</p>
          <p>Birthdate    : ${formData.birthdate}</p>
          <p>SSN          : ${formData.ssn}</p>
          <p>Address      : ${formData.address}</p>
          <p>Phone Number : ${formData.number}</p>
          <p>Email        : ${formData.email}</p>
          <p>Communication: ${communicationValues}</p>
          <p>Employee ID  : ${formData.emp}</p>
          <p>Job Title    : ${formData.job}</p>
          <p>Department   : ${formData.department}</p>
          <p>Salary       : ${formData.salary}</p>
          <p>Hobbies      : ${formData.hobbies}</p>
          <p>Notes        : ${formData.notes}</p>
        `;

    modalBody.innerHTML += dataHtml;
  });
}

function saveData(name, ssn, number, email, emp, job, salary, hobbies,
  department, address, notes, birthdate, communicationValues) {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const formData = {
    name,
    ssn,
    number,
    email,
    communication: communicationValues,
    emp,
    job,
    salary,
    hobbies,
    department,
    address,
    notes,
    birthdate,
    gender
  };

  formDataArray.push(formData);
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

  // eslint-disable-next-line no-return-assign
  document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

birthdateInput.addEventListener('blur', birthdateValidation);
salaryInput.addEventListener('blur', decimalSalary);
clearButton.addEventListener('click', clearForm);
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearError();
  const name = nameInput.value.trim();
  const ssn = ssnInput.value.trim();
  const number = numberInput.value.trim();
  const email = emailInput.value.trim();
  const emp = empInput.value.trim();
  const job = jobInput.value.trim();
  const salary = salaryInput.value.trim();
  const hobbies = hobbiesInput.value.trim();
  const department = departmentInput.value.trim();
  const address = addressInput.value.trim();
  const notes = notesInput.value.trim();
  const birthdate = birthdateInput.value.trim();

  if (validation()) {
    saveData(name, ssn, number, email, emp, job, salary, hobbies,
      department, address, notes, birthdate);
    displayData();
    $('#myModal').modal('show');
  }
});
