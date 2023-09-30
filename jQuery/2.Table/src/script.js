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
const radioCheckboxes = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
const genderOptions = document.querySelectorAll('input[name="gender"]');
const communicationOptions = document.querySelectorAll('input[name="communication[]"]');
const elementsWithBgDangerClass = document.querySelectorAll('.red');
const elementsWithDangerClass = document.querySelectorAll('.danger');
const formDataArray = [];
const communicationValuesArray = [];
let editingIndex = -1;

empInput.value = generateRandomNumber();

//Generate a radom number between 1-10 on employee id field
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}

//Change the format of date as yyyy-mm-dd if it is not.
function birthdateValidation() {
  const originalDate = birthdateInput.value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(originalDate)) {
    return;
  }
  const dateParts = originalDate.split(/[-/]/);

  if (dateParts.length === 3) {
    const [day, month, year] = dateParts;

    if (year.length < 4) {
      return;
    }
    const parsedDate = new Date(`${year}-${month}-${day}`);

    if (!isNaN(parsedDate.getTime())) {
      const adjustedMonth = parsedDate.getMonth() + 1;
      const adjustedDay = parsedDate.getDate();
      const formattedDate = `${parsedDate.getFullYear()}-${String(adjustedMonth).padStart(2, '0')}-${String(adjustedDay).padStart(2, '0')}`;

      birthdateInput.value = formattedDate;
    }
  }
}

//Calculate age based on the date of birth
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  if (today.getDate() < birthDate.getDate()) {
    return age - 1;
  }
  return age;
}

// Check the age is between 18-100 or not.
function validateAge() {
  const age = calculateAge(birthdateInput.value);

  if (age < 18 || age > 100) {
    birthdateError.textContent = 'Age must be between 18 and 100 years.';
    return false;
  } else {
    return true;
  }
}

//Check the date of birth is a valid date or not.
function isValidDate(dateString) {
  const dateParts = dateString.split('-');

  if (dateParts.length !== 3) {
    return false;
  }

  const [year, month, day] = dateParts;
  const numericYear = parseInt(year, 10);
  const numericMonth = parseInt(month, 10);
  const numericDay = parseInt(day, 10);

  if (
    isNaN(numericYear) ||
    isNaN(numericMonth) ||
    isNaN(numericDay) ||
    year.length !== 4 ||
    month < 1 || month > 12 ||
    day < 1 || day > 31
  ) {
    return false;
  }

  if (
    (numericMonth === 4 || numericMonth === 6 || numericMonth === 9 || numericMonth === 11) &&
    numericDay > 30
  ) {
    return false;
  }

  if (numericMonth === 2) {
    if (
      (numericYear % 4 !== 0) ||
      (numericYear % 100 === 0 && numericYear % 400 !== 0)
    ) {
      if (numericDay > 28) {
        return false;
      }
    } else if (numericDay > 29) {
      return false;
    }
  }

  return true;
}

//Convert the salary to decimal value.
function salToDecimal() {
  const salaryValue = salaryInput.value.trim();
  const dotCount = (salaryValue.match(/\./g) || []).length;

  if (salaryValue !== '') {
    if (dotCount > 1) {
      document.querySelector('#salaryError').textContent = 'Invalid';
    } else {
      document.querySelector('#salaryError').textContent = '';
      const decimalSalary = parseFloat(salaryValue);
      if (!isNaN(decimalSalary)) {
        salaryInput.value = decimalSalary.toFixed(2);
      }
    }
  }
}

//Change the background color if a field is empty.
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

//Display of an alert message if any of the field is empty.
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
    checkField(notesInput),
    checkField(birthdateInput),
    validateGender(),
    validateCommunication()
  ];
  if (validationResults.includes(false)) {
    alert('Fill out the required fields');
  }
  return validationResults;
}

//Check the gender value selected or not.
function validateGender() {
  let checked = false;

  genderOptions.forEach(option => {
    if (option.checked) {
      checked = true;
      elementsWithBgDangerClass.forEach(element => {
        element.style.backgroundColor = '#ecf5f7';
      });
    }
  });

  if (!checked) {
    elementsWithBgDangerClass.forEach(element => {
      element.style.backgroundColor = '#ffcccc';
    });
  }
  return checked;
}

//Check at least one communication method selected or not.
function validateCommunication() {
  let checked = false;
  communicationOptions.forEach(option => {
    if (option.checked) {
      checked = true;

      elementsWithDangerClass.forEach(element => {
        element.style.backgroundColor = '#ecf5f7';
      });
    }
  });

  if (!checked) {
    elementsWithDangerClass.forEach(element => {
      element.style.backgroundColor = '#ffcccc';
    });
  }

  return checked;
}

//If the fields contain non allowed inputs display an error message.
function isAllowed(element, expression, index, message) {
  if (element.value.trim() === '') {
    document.querySelectorAll('.error')[index].textContent = '';
    return;
  }

  if (!element.value.match(expression)) {
    document.querySelectorAll('.error')[index].textContent = message;
  }
}

//Check the fields contains allowed inputs or not.
function checkAllowedInputs() {
  const nameRegex = /^[a-zA-Z\s]*$/;
  const ssnRegex = /^[0-9-]*$/;
  const numberRegex = /^[0-9]*$/;
  const notesRegex = /^[a-zA-Z0-9,.\s]*$/;
  const hobbiesRegex = /^[a-zA-Z\s,-]*$/;
  const addressRegex = /^[a-zA-Z0-9\s,-]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;
  const emailError = 'Accept gmail.com and yahoo.com only';
  const nameError = 'Alphabets and spaces only';
  const ssnError = 'Numbers and hyphens only';
  const numberError = 'Numbers only';
  const notesError = 'Alphanumeric characters with spaces, commas, and dots only';
  const hobbiesError = 'Alphabets, commas, and hyphens only';
  const addressError = 'Alphanumeric characters with spaces, commas, and hyphens only';

  isAllowed(nameInput, nameRegex, 0, nameError);
  isAllowed(ssnInput, ssnRegex, 2, ssnError);
  isAllowed(addressInput, addressRegex, 3, addressError);
  isAllowed(numberInput, numberRegex, 4, numberError);
  isAllowed(emailInput, emailRegex, 5, emailError);
  isAllowed(jobInput, nameRegex, 6, nameError);
  isAllowed(hobbiesInput, hobbiesRegex, 8, hobbiesError);
  isAllowed(notesInput, notesRegex, 9, notesError);
  validateAge();
  if (birthdateInput.value.trim() !== '' && !isValidDate(birthdateInput.value)) {
    birthdateError.textContent = 'Please enter a valid date.';
  }

}

//If the field  input length not matching the required lengths display an error message.
function checkLength(element, minLength, maxLength, index, minLengthMessage, maxLengthMessage) {
  const value = element.value.trim();
  if (value.length === 0) {
    document.querySelectorAll('.error')[index].textContent = '';
    return true;
  }
  if (value.length < minLength || value.length > maxLength) {
    document.querySelectorAll('.error')[index].textContent = value.length < minLength ? minLengthMessage : maxLengthMessage;
    return false;
  }
  document.querySelectorAll('.error')[index].textContent = '';
  return true;
}

//Check the fields input matching the required lengths.
function checkAllowedLength() {
  checkLength(nameInput, 3, 20, 0, 'Name must be at least 3 characters long', 'Name cannot exceed 20 characters');
  checkLength(ssnInput, 7, 9, 2, 'Social security number must be at least 7 characters long', 'Social security number cannot exceed 9 characters');
  checkLength(numberInput, 7, 10, 4, 'Phone number must be at least 7 characters long', 'Phone number cannot exceed 10 characters');
  checkLength(emailInput, 10, 50, 5, 'Invalid email', 'Name cannot exceed 50 characters');
  checkLength(jobInput, 3, 50, 6, 'Job title must be at least 3 characters long', 'Job title cannot exceed 50 characters');
  checkLength(salaryInput, 6, 13, 7, 'Salary must be at least 3 characters long', 'Salary cannot exceed 10 characters');
  checkLength(hobbiesInput, 3, 25, 8, 'Hobbies must be at least 10 characters long', 'Hobbies cannot exceed 25 characters');
}

//Clear the background color of input fields with input type as radio and checkbox.
function clearRadioCheckboxBg() {
  elementsWithDangerClass.forEach(element => {
    element.style.backgroundColor = '#ecf5f7';
  });
  elementsWithBgDangerClass.forEach(element => {
    element.style.backgroundColor = '#ecf5f7';
  });
}

//Clear the error messages.
function clearError() {
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = '';
  });
}

//Clear form, error messages and background colors .
function clearForm() {
  const inputs = [
    nameInput, ssnInput, numberInput, emailInput, jobInput,
    salaryInput, hobbiesInput, addressInput,
    notesInput, birthdateInput
  ];
  clearRadioCheckboxBg();
  empInput.value = generateRandomNumber();

  departmentInput.selectedIndex = 0;
  departmentInput.style.backgroundColor = '#ffffff';

  inputs.forEach((input) => {
    input.value = '';
    input.style.backgroundColor = '#ffffff';
  });

  radioCheckboxes.forEach((input) => {
    input.checked = false;
  });

  document.querySelectorAll('.error').forEach(error => error.textContent = '');
}

// Save form data
function saveData(formData) {
  const communicationValues = Array.from(communicationOptions)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  formData.communication = communicationValues;
  communicationValuesArray.push(communicationValues);
  formDataArray.push({
    ...formData
  });
}

//Display saved form data in a modal
function displayData() {
  const formDataTable = document.querySelector('#formDataTable tbody');
  formDataTable.innerHTML = '';

  formDataArray.forEach((formData, index) => {
    const row = formDataTable.insertRow();

    const keys = [
      'name', 'gender', 'birthdate', 'ssn', 'address', 'number', 'email', 'communication',
      'emp', 'job', 'department', 'salary', 'hobbies', 'notes'
    ];

    keys.forEach((key) => {
      const cell = row.insertCell();
      cell.textContent = formData[key];
      cell.classList.add('word-wrap');
    });

    const actionCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button'); 
    editButton.addEventListener('click', () => editRow(index)); 
    actionCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button'); 
    deleteButton.addEventListener('click', () => deleteRow(index)); 
    actionCell.appendChild(deleteButton);
  });

  clearForm();
  editingIndex = -1; 
}
function deleteRow(index) {
  formDataArray.splice(index, 1);
  displayData();
}


function editRow(index) {
  const formData = formDataArray[index];

  // Populate the form fields with the data from the retrieved form data
  nameInput.value = formData.name;
  ssnInput.value = formData.ssn;
  numberInput.value = formData.number;
  emailInput.value = formData.email;
  empInput.value = formData.emp;
  jobInput.value = formData.job;
  salaryInput.value = formData.salary;
  hobbiesInput.value = formData.hobbies;
  departmentInput.value = formData.department;
  addressInput.value = formData.address;
  notesInput.value = formData.notes;
  birthdateInput.value = formData.birthdate;

  genderOptions.forEach(option => {
    option.checked = option.value === formData.gender;
  });

  communicationOptions.forEach(option => {
    option.checked = formData.communication.includes(option.value);
  });

  editingIndex = index;

  window.scrollTo(0, 0);
}


function updateData(formData) {
  if (editingIndex !== -1) {
    const communicationValues = Array.from(communicationOptions)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  formData.communication = communicationValues;
  communicationValuesArray.push(communicationValues);
    formDataArray[editingIndex] = formData;
  }
}

function validation() {
  const isRequiredResult = isRequired();
  checkAllowedLength();
  checkAllowedInputs();
  const errorMessages = document.querySelectorAll('.error');
  const hasErrors = Array.from(errorMessages).some((errorMessage) => errorMessage.textContent !== '');

  return !hasErrors && isRequiredResult.every(result => result === true);
}

salaryInput.addEventListener('blur', salToDecimal);
birthdateInput.addEventListener('blur', birthdateValidation);
clearButton.addEventListener('click', clearForm);
submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  clearError();
  const formData = {
    name: nameInput.value.trim(),
    ssn: ssnInput.value.trim(),
    number: numberInput.value.trim(),
    email: emailInput.value.trim(),
    emp: empInput.value.trim(),
    job: jobInput.value.trim(),
    salary: salaryInput.value.trim(),
    hobbies: hobbiesInput.value.trim(),
    department: departmentInput.value.trim(),
    address: addressInput.value.trim(),
    notes: notesInput.value.trim(),
    birthdate: birthdateInput.value.trim(),
  };

  if (validation()) {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    formData.gender = gender;

    if (editingIndex === -1) {
      saveData(formData);
    } else {
      updateData(formData);
    }

    displayData();
  }
});
