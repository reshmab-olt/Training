
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('webForm');
  const submitButton = document.getElementById('submit');
  const clearButton = document.getElementById('clear');
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const ssnInput = document.getElementById('ssn');
  const ssnError = document.getElementById('ssnError');
  const numberInput = document.getElementById('number');
  const phoneError = document.getElementById('phoneError');
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const empInput = document.getElementById('emp');
  const idError = document.getElementById('idError');
  const jobInput = document.getElementById('job');
  const titleError = document.getElementById('titleError');
  const salaryInput = document.getElementById('salary');
  const salaryError = document.getElementById('salaryError');
  const hobbiesInput = document.getElementById('hobbies');
  const hobbiesError = document.getElementById('hobbiesError');
  const departmentInput = document.getElementById('department');
  const addressInput = document.getElementById('address');
  const addressError = document.getElementById('addressError');
  const notesInput = document.getElementById('notes');
  const notesError = document.getElementById('notesError');
  const birthdateError = document.getElementById('birthdateError');
  const birthdateInput = document.getElementById('birthdate');

  birthdateInput.addEventListener('blur', () => {
    const originalDate = birthdateInput.value.trim();

    if (birthdateInput.value.trim() !== '') {
      birthdateInput.style.backgroundColor = '#ffffff';
    }
    const dateParts = originalDate.split('/');

    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      const parsedDate = new Date(`${year}-${month}-${day}`);

      if (!isNaN(parsedDate.getTime())) {
        // eslint-disable-next-line prefer-destructuring
        birthdateInput.value = parsedDate.toISOString().split('T')[0];
      }
    }
  });

  empInput.value = generateRandomNumber();

  salaryInput.addEventListener('blur', () => {
    const salaryValue = salaryInput.value.trim();

    if (salaryValue !== '') {
      const decimalSalary = parseFloat(salaryValue);

      salaryInput.style.backgroundColor = '#ffffff';

      if (!isNaN(decimalSalary)) {
        salaryInput.value = decimalSalary.toFixed(2);
      }
    }
  });
  nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() !== '') {
      nameError.textContent = '';
    }
  });
  ssnInput.addEventListener('blur', () => {
    if (ssnInput.value.trim() !== '') {
      ssnError.textContent = '';
    }
  });
  addressInput.addEventListener('blur', () => {
    if (addressInput.value.trim() !== '') {
      addressError.textContent = '';
      addressInput.style.backgroundColor = '#ffffff';
    }
  });
  numberInput.addEventListener('blur', () => {
    if (numberInput.value.trim() !== '') {
      phoneError.textContent = '';
    }
  });
  jobInput.addEventListener('blur', () => {
    if (jobInput.value.trim() !== '') {
      titleError.textContent = '';
    }
  });
  hobbiesInput.addEventListener('blur', () => {
    if (hobbiesInput.value.trim() !== '') {
      hobbiesError.textContent = '';
    }
  });
  notesInput.addEventListener('blur', () => {
    if (notesInput.value.trim() !== '') {
      notesError.textContent = '';
    }
  });
  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() !== '') {
      emailError.textContent = '';
    }
  });

  // eslint-disable-next-line func-style
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
  submitButton.addEventListener('click', (event) => {
    const name = nameInput.value.trim();
    const ssn = ssnInput.value.trim();
    const number = numberInput.value.trim();
    const email = emailInput.value.trim();
    const emp = empInput.value.trim();
    const job = jobInput.value.trim();
    const salary = salaryInput.value.trim();
    const hobbies = hobbiesInput.value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const communication = document.querySelectorAll('input[name="communication[]"]:checked');
    const department = departmentInput.value.trim();
    const address = addressInput.value.trim();
    const notes = notesInput.value.trim();
    const birthdate = birthdateInput.value.trim();

    const age = calculateAge(birthdate);

    event.preventDefault();

    // eslint-disable-next-line max-len
    if (age < 18 || age > 100) {
      birthdateError.textContent = 'Age must be between 18 and 100 years.';
      // event.preventDefault();
      return false;
    } else {
      birthdateError.textContent = '';
    }
    // eslint-disable-next-line max-len
    if (name === '' || address === '' || ssn === '' || number === '' || email === '' || emp === '' || job === '' || salary === '' || hobbies === '' || !gender || communication.length === 0 || department === '' || birthdate === '') {
      alert('Fill out the required fields');
      if (name === '') nameInput.style.backgroundColor = '#efd9d9';
      if (address === '') addressInput.style.backgroundColor = '#efd9d9';
      if (ssn === '') ssnInput.style.backgroundColor = '#efd9d9';
      if (number === '') numberInput.style.backgroundColor = '#efd9d9';
      if (email === '') emailInput.style.backgroundColor = '#efd9d9';
      if (emp === '') empInput.style.backgroundColor = '#efd9d9';
      if (job === '') jobInput.style.backgroundColor = '#efd9d9';
      if (salary === '') salaryInput.style.backgroundColor = '#efd9d9';
      if (hobbies === '') hobbiesInput.style.backgroundColor = '#efd9d9';
      if (birthdate === '') birthdateInput.style.backgroundColor = '#efd9d9';
      if (!gender) {
        // Handle gender radio buttons
        const genderRadioButtons = document.querySelectorAll('input[name="gender"]');

        genderRadioButtons.forEach((radio) => {
          radio.style.backgroundColor = '#efd9d9';
        });
      }
      if (communication.length === 0) {
        // Handle communication checkboxes
        const communicationCheckboxes = document.querySelectorAll('input[name="communication[]"]');

        communicationCheckboxes.forEach((checkbox) => {
          checkbox.style.backgroundColor = '#efd9d9';
        });
      }
      if (department === '') departmentInput.style.backgroundColor = '#efd9d9';

      event.preventDefault();
    } else if (name.length < 3 || name.length > 10) {
      nameError.textContent = 'Name must be between 3 and 10 characters.';
      event.preventDefault();
    } else if (birthdate.length < 8 || birthdate.length > 10) {
      birthdateError.textContent = 'Invalid date';
      event.preventDefault();
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      nameError.textContent = 'The letters should accept alphabets and spaces only';
      event.preventDefault();
    } else if (!/^[a-zA-Z0-9,-]+$/.test(address)) {
      addressError.textContent = 'The letters should accept alphanumeric , spaces, commas, and hyphens only';
      event.preventDefault();
    } else if (ssn.length < 7 || ssn.length > 9) {
      ssnError.textContent = 'Social Security Number must be between 7 and 9 characters.';
      event.preventDefault();
    } else if (!/^[0-9-]+$/.test(ssn)) {
      ssnError.textContent = 'The letters should accept numbers and hyphens only';
      event.preventDefault();
    } else if (number.length < 7 || number.length > 10) {
      phoneError.textContent = 'Phone number must be between 7 and 10 characters.';
      event.preventDefault();
    } else if (!/^\d+$/.test(number)) {
      phoneError.textContent = 'The letters should accept numbers only';
      event.preventDefault();
    } else if (email.length > 50) {
      emailError.textContent = 'The maximum length of email is 50 characters';
      event.preventDefault();
    } else if (!email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
      emailError.textContent = 'Invalid email format';
      event.preventDefault();
    } else if (emp.length > 2) {
      idError.textContent = 'The maximum length of employee Id is 2 characters';
      event.preventDefault();
    } else if (job.length < 3 || job.length > 50) {
      titleError.textContent = 'Job title must be between 3 and 50 characters.';
      event.preventDefault();
    } else if (!/^[a-zA-Z\s]+$/.test(job)) {
      titleError.textContent = 'The letters should accept alphabets and spaces only';
      event.preventDefault();
    } else if (salary.length < 3 || salary.length > 10) {
      salaryError.textContent = 'Salary must be 3 to 10 digits';
      event.preventDefault();
    } else if (hobbies.length < 3 || hobbies.length > 25) {
      hobbiesError.textContent = 'Name must be between 3 and 25 characters.';
      event.preventDefault();
    } else if (!/^[a-zA-Z,-]+$/.test(hobbies)) {
      hobbiesError.textContent = 'The letters should accept alphabets with commas and hyphens only';
      event.preventDefault();
    } else if (!/^[a-zA-Z0-9 ,.]+$/.test(notes)) {
      notesError.textContent = 'The letters should accept alphanumeric characters with spaces, commas, and dots only';
      event.preventDefault();
    } else {
      window.location.href = 'main.html';
    }
  });

  // eslint-disable-next-line func-style
  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  clearButton.addEventListener('click', () => {
    form.reset();
    nameError.textContent = '';
    ssnError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';
    idError.textContent = '';
    titleError.textContent = '';
    salaryError.textContent = '';
    addressError.textContent = '';
    notesError.textContent = '';
    hobbiesError.textContent = '';
    empInput.value = generateRandomNumber();
    nameInput.style.backgroundColor = '#fff';
    addressInput.style.backgroundColor = '#fff';
    ssnInput.style.backgroundColor = '#fff';
    numberInput.style.backgroundColor = '#fff';
    emailInput.style.backgroundColor = '#fff';
    empInput.style.backgroundColor = '#fff';
    jobInput.style.backgroundColor = '#fff';
    salaryInput.style.backgroundColor = '#fff';
    hobbiesInput.style.backgroundColor = '#fff';
    birthdateInput.style.backgroundColor = '#fff';
  });
});
