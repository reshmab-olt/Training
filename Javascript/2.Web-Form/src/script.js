
document.addEventListener('DOMContentLoaded', () => {
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

  empInput.value = generateRandomNumber();
  
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
  
  salaryInput.addEventListener('blur', () => {
    const salaryValue = salaryInput.value.trim();

    if (salaryValue !== '') {
      const decimalSalary = parseFloat(salaryValue);
      if (!isNaN(decimalSalary)) {
        salaryInput.value = decimalSalary.toFixed(2);
      }
    }
  });
  
  function clearError(){
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent='';
    });
  }
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    clearError();
    if (validation()) {
      window.location.href = 'successful.html';
    }
  });
  
  function validation() {
    const isRequiredResult = isRequired();
    checkAllowedLength();
    checkAllowedInputs();
    const errorMessages = document.querySelectorAll('.error');
    const hasErrors = Array.from(errorMessages).some((errorMessage) => errorMessage.textContent !== '');
  
    return !hasErrors && isRequiredResult.every(result => result === true);
  }
  
  
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
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
  function validateGender() {
    const genderOptions = document.querySelectorAll('input[name="gender"]');
    let checked = false;
    genderOptions.forEach(option => {
      if (option.checked) {
        checked = true;
      }
    });
  
    return checked;
  }
  
  function validateCommunication() {
    const communicationOptions = document.querySelectorAll('input[name="communication[]"]');
    let checked = false;
  
    communicationOptions.forEach(option => {
      if (option.checked) {
        checked = true;
      }
    });
  
    return checked;
  }
  
  function isRequired(){
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

function checkAllowedLength() {
  checkLength(nameInput, 3, 20, 0, 'Name must be at least 3 characters long', 'Name cannot exceed 20 characters');
  checkLength(ssnInput, 7, 9, 2, 'Social security number must be at least 7 characters long', 'Social security number cannot exceed 9 characters');
  checkLength(numberInput, 7, 10, 4, 'number must be at least 7 characters long', 'number cannot exceed 10 characters');
  checkLength(emailInput, 10, 50, 5, 'Ivalid email', 'Name cannot exceed 50 characters');
  checkLength(jobInput, 3, 50, 6, 'job title must be at least 3 characters long', 'job title cannot exceed 50 characters');
  checkLength(salaryInput, 3, 10, 7, 'Notes must be at least 3 characters long', 'Notes cannot exceed 10 characters');
  checkLength(hobbiesInput, 3, 25, 8, 'Hobbies must be at least 10 characters long', 'Hobbies cannot exceed 25 characters');
}

function isValidDate(dateString) {
  const dateParts = dateString.split('-');

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
function clearForm() {
  const inputs = [
    nameInput, ssnInput, numberInput, emailInput, jobInput,
    salaryInput, hobbiesInput, departmentInput, addressInput,
    notesInput, birthdateInput
  ];

  inputs.forEach(input => {
    input.value = '';
    input.style.backgroundColor = '#ffffff';
  });

  document.querySelectorAll('.error').forEach(error => error.textContent = '');
}
clearButton.addEventListener('click', clearForm);

});
