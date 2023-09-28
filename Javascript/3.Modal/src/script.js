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
  const age = calculateAge(birthdateInput.value);

  if (age < 18 || age > 100) {
    birthdateError.textContent = 'Age must be between 18 and 100 years.';
    return false;
  } else {
    return true;
  }
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

function validateGender() {
  const genderOptions = document.querySelectorAll('input[name="gender"]');
  let checked = false;

  genderOptions.forEach(option => {
    if (option.checked) {
      checked = true;
      const elementsWithBgDangerClass = document.querySelectorAll('.red');
      elementsWithBgDangerClass.forEach(element => {
        element.style.backgroundColor = '#ecf5f7';
      });
    }
  });

  if (!checked) {
    const elementsWithBgDangerClass = document.querySelectorAll('.red');
    elementsWithBgDangerClass.forEach(element => {
      element.style.backgroundColor = '#ffcccc';
    });
  }
  return checked;
}

function validateCommunication() {
  const communicationOptions = document.querySelectorAll('input[name="communication[]"]');
  let checked = false;

  communicationOptions.forEach(option => {
    if (option.checked) {
      checked = true;
      const elementsWithDangerClass = document.querySelectorAll('.danger');
      elementsWithDangerClass.forEach(element => {
        element.style.backgroundColor = '#ecf5f7';
      });
    }
  });

  if (!checked) {
    const elementsWithDangerClass = document.querySelectorAll('.danger');
    elementsWithDangerClass.forEach(element => {
      element.style.backgroundColor = '#ffcccc';
    });
  }

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
  const notesRegex = /^[a-zA-Z,.\s]*$/;
  const hobbiesRegex = /^[a-zA-Z\s,-]*$/;
  const addressRegex = /^[a-zA-Z0-9\s,-]*$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i;
  const emailError = 'Accept gmail.com and yahoo.com only';
  const nameError = 'Alphabets and spaces only';
  const ssnError = 'Numbers and hyphens only';
  const numberError = 'Numbers only';
  const noteserror = 'Alphanumeric characters with spaces, commas, and dots only';
  const hobbiesError = 'Alphabets, commas, and hyphens only';
  const addressError = 'Alphanumeric characters with spaces, commas, and hyphens only';

  isAllowed(nameInput, nameRegex, 0, nameError);
  isAllowed(ssnInput, ssnRegex, 2, ssnError);
  isAllowed(addressInput, addressRegex, 3, addressError);
  isAllowed(numberInput, numberRegex, 4, numberError);
  isAllowed(emailInput, emailRegex, 5, emailError);
  isAllowed(jobInput, nameRegex, 6, nameError);
  isAllowed(hobbiesInput, hobbiesRegex, 8, hobbiesError);
  isAllowed(notesInput, notesRegex, 9, noteserror);
  validateAge();
  if (birthdateInput.value.trim() !== '' && !isValidDate(birthdateInput.value)) {
    birthdateError.textContent = 'Please enter a valid date.';
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

function clearRadioCheckboxBg() {
  const elementsWithDangerClass = document.querySelectorAll('.danger');
  elementsWithDangerClass.forEach(element => {
    element.style.backgroundColor = '#ecf5f7';
  });
  const elementsWithBgDangerClass = document.querySelectorAll('.red');
  elementsWithBgDangerClass.forEach(element => {
    element.style.backgroundColor = '#ecf5f7';
  });
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
  clearRadioCheckboxBg();
  const radioCheckboxes = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');

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
function displayData() {
  const modalBody = document.querySelector('.modal-body');

  modalBody.innerHTML = '';
  formDataArray.forEach((formData, index) => {
    const communicationValues = Array.from(
      document.querySelectorAll('input[name="communication[]"]:checked')
    ).map(checkbox => checkbox.value).join(', ');

    const dataHtml = `
      <div class="data-entry">
        <h3>Data</h3>
        <div class="data-details">
          <p><span class="width-60">Name</span> <span class="colon">:</span>${formData.name}</p>
          <p><span class="width-60">Gender</span> <span class="colon">:</span>${formData.gender}</p>
          <p><span class="width-60">Date of Birth</span> <span class="colon">:</span>${formData.birthdate}</p>
          <p><span class="width-60">Social Security Number</span> <span class="colon">:</span>${formData.ssn}</p>
          <p><span class="width-60">Address</span> <span class="colon">:</span>${formData.address}</p>
          <p><span class="width-60">Phone Number</span> <span class="colon">:</span>${formData.number}</p>
          <p><span class="width-60">Email</span> <span class="colon">:</span>${formData.email}</p>
          <p><span class="width-60">Preffered method of communication</span> <span class="colon">:</span>${communicationValues}</p>
          <p><span class="width-60">Employee ID</span> <span class="colon">:</span>${formData.emp}</p>
          <p><span class="width-60">Job Title</span> <span class="colon">:</span>${formData.job}</p>
          <p><span class="width-60">Department</span> <span class="colon">:</span>${formData.department}</p>
          <p><span class="width-60">Salary</span> <span class="colon">:</span>${formData.salary}</p>
          <p><span class="width-60">Hobbies</span> <span class="colon">:</span>${formData.hobbies}</p>
          <p><span class="width-60">Adsditional Notes</span> <span class="colon">:</span>${formData.notes}</p>
        </div>
      </div>
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