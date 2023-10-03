
const formDataArray = [];
$('#emp').val(generateEmployeeID());
const tableBody = $('table tbody');

$('#webForm').validate({
  rules: {
    name: {
      required: true,
      minlength: 3,
      maxlength: 20,
      pattern: /^[a-zA-Z\s]+$/
    },
    gender: {
      required: true
    },
    dob: {
      required: true,
      isValidDate: true,
      validateAge: true
    },
    securitynumber: {
      required: true,
      minlength: 7,
      maxlength: 9,
      pattern: /^[0-9-]*$/
    },
    address: {
      required: true,
      pattern: /^[a-zA-Z0-9\s,-]*$/
    },
    number: {
      required: true,
      minlength: 7,
      maxlength: 10,
      pattern: /^[0-9]*$/
    },
    email: {
      required: true,
      email: true,
      maxlength: 50,
      pattern: /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i
    },
    'communication[]': {
      required: true
    },
    department: {
      required: true,
    },
    job: {
      required: true,
      minlength: 3,
      maxlength: 50,
      pattern: /^[a-zA-Z\s,]*$/
    },
    salary: {
      required: true,
      number: true,
      pattern: /^[0-9.]*$/,
      minlength: 3,
      maxlength: 10
    },
    hobbies: {
      required: true,
      minlength: 3,
      maxlength: 25,
      pattern: /^[a-zA-Z\s,-]*$/
    },
    notes: {
      pattern: /^[a-zA-Z0-9\s,.]*$/
    }
  },

  messages: {
    name: {
      minlength: "Name should be at least 3 characters.",
      maxlength: "This field cannot exceed 20 characters.",
      pattern: "Alphabets and spaces only."
    },
    gender: {
      required: "Please select a gender."
    },
    dob: {
      date: "Please enter a valid date of birth (YYYY-MM-DD format).",
    },
    securitynumber: {
      minlength: "This field should be at least 7 characters long",
      maxlength: "This field cannot exceed 9 characters",
      pattern: "Numbers and hyphens only"
    },
    address: {
      pattern: "Alphanumeric characters with spaces, commas and hyphens only."
    },
    number: {
      minlength: "Phone number should be at least 7 digits.",
      maxlength: "Phone number cannot exceed 10 characters",
      pattern: "Numbers only"
    },
    email: {
      email: "Please enter a valid email address.",
      pattern: "Should accept gmail.com and yahoo.com only",
      maxlength: "Email cannot exceed 50 characters."
    },
    'communication[]': {
      required: "Select at least one method."
    },
    department: {
      required: "Please select a department."
    },
    job: {
      minlength: "This field should be 3 characters long",
      maxlength: "This field cannot exceed 50 characters.",
      pattern: "Alphabets,spaces and commas only "
    },
    hobbies: {
      minlength: "This field should be 3 characters long",
      maxlength: "This field cannot exceed 25 characters.",
      pattern: "Alphabets with commas and hyphens only"
    },
    notes: {
      pattern: "Alphanumeric characters with spaces, commas and dots only"
    },
    salary: {
      minlength: "Salary should be at least 3 characters long",
      maxlength: "Salary should not exceed 10 characters"
    }
  },
  errorElement: 'span',
  errorPlacement: function (error, element) {
    if (element.attr('name') === 'gender') {
      error.insertAfter(element.closest('.gender-group'));
    } else if (element.attr('name') === 'communication[]') {
      error.insertAfter(element.closest('.communication-group'));
    } else {
      error.insertAfter(element);
    }
  }

});

//Calculate age based on date of birth
function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  const age = today.getFullYear() - birthDate.getFullYear();
  if (today.getDate() < birthDate.getDate()) {
    return age - 1;
  }
  return age;
}

//Check age is between 18-100 or not.
$.validator.addMethod("validateAge", function (value) {
  const birthdate = value;
  const age = calculateAge(birthdate);

  return age >= 18 && age <= 100;
}, "Age must be between 18 and 100");

// To check the date is valid or not
$.validator.addMethod("isValidDate", function (value) {

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}, "Please enter a valid date in YYYY-MM-DD format.");

//Convert salary to decimal value
function salToDecimal() {
  const salaryInput = $('#salary');
  const salaryValue = salaryInput.val().trim();

  if (salaryValue !== '') {
    const decimalSalary = parseFloat(salaryValue);
    if (!isNaN(decimalSalary)) {
      salaryInput.val(decimalSalary.toFixed(2));

    }
  }
}

//Generate random number between 1-10 on employee id field
function generateEmployeeID() {
  return Math.floor(Math.random() * 10) + 1;
}

// To clear form 
function clearForm() {
  $('#webForm')[0].reset();
  $('#webForm').validate().resetForm();
  $('#webForm .error').removeClass('error');
  $('#emp').val(generateEmployeeID());
}

//To display data in table
function displayData(formData) {
  const newRow = $('<tr></tr>'); 
  for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
          const cell = $('<td></td>');
              cell.text(formData[key]);
          newRow.append(cell);
      }
  }
  const actionCell = $('<td></td>');
  newRow.append(actionCell);
  let editButton = $('<button>').text('Edit').addClass('edit-button');
  let deleteButton = $('<button>').text('Delete').addClass('delete-button');
  actionCell.append(editButton);
  actionCell.append(deleteButton);
  deleteButton.on('click', function () {
      deleteRow(newRow);
  });

  editButton.on('click', function () {
      updateData(newRow);
  });
  tableBody.append(newRow);
}

//To update data in table
function updateData(row) {
  const index = tableBody.children().index(row);
  const formData = formDataArray[index];

    $('#name').val(formData.name);
    $('input[name="gender"]').prop('checked', false); 
    $(`input[name="gender"][value="${formData.gender}"]`).prop('checked', true);
    $('#dob').val(formData.dob);
    $('#ssn').val(formData.securitynumber);
    $('#address').val(formData.address);
    $('#number').val(formData.phone);
    $('#email').val(formData.email);
    $('input[name="communication[]"]').prop('checked', false); 
    formData.communication.forEach((communicationMethod) => {
      $(`input[name="communication[]"][value="${communicationMethod}"]`).prop('checked', true);
    });
    $('#emp').val(formData.empid);
    $('#job').val(formData.job);
    $('#department').val(formData.department);
    $('#salary').val(formData.salary);
    $('#hobbies').val(formData.hobbies);
    $('#notes').val(formData.notes);
  
  formData.name = $('#name').val();
  formData.gender = $('input[name="gender"]:checked').val();
  formData.dob = $('#dob').val();
  formData.securitynumber = $('#ssn').val();
  formData.address = $('#address').val();
  formData.phone = $('#number').val();
  formData.email = $('#email').val();
  formData.communication = $('input[name="communication[]"]:checked')
    .map(function () {
      return this.value;
    })
    .get();
  formData.empid = $('#emp').val();
  formData.job = $('#job').val();
  formData.department = $('#department').val();
  formData.salary = $('#salary').val();
  formData.hobbies = $('#hobbies').val();
  formData.notes = $('#notes').val();

  deleteRow(row);
}

//To delete table row
function deleteRow(row) {
  const index = tableBody.children().index(row);
  formDataArray.splice(index, 1);
  row.remove();
}

$('#clear').click(function () {
  clearForm();
});

$('#salary').on('blur', function () {
  salToDecimal();
});

$('#webForm').submit(function (event) {
  event.preventDefault();

  if ($('#webForm').valid()) {
    let formData = {
      name: $('#name').val(),
      gender: $('input[name="gender"]:checked').val(),
      dob: $('#dob').val(),
      securitynumber: $('#ssn').val(),
      address: $('#address').val(),
      phone: $('#number').val(),
      email: $('#email').val(),
      communication: $('input[name="communication[]"]:checked')
        .map(function () {
          return this.value;
        })
        .get(),
      empid: $('#emp').val(),
      job: $('#job').val(),
      department: $('#department').val(),
      salary: $('#salary').val(),
      hobbies: $('#hobbies').val(),
      notes: $('#notes').val(),
    };
    formDataArray.push(formData);
    displayData(formData);
    $('#webForm')[0].reset();
    $('#emp').val(generateEmployeeID());
  }
});