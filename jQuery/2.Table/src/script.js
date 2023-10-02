generateEmployeeID();

//Regex functions
$.validator.addMethod("alphabetsAndSpaces", function (value, element) {
  return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
}, "Alphabets and spaces only.");

$.validator.addMethod("gmailAndYahoo", function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i.test(value);
}, "Should accept gamil.com and yahoo.com only");

$.validator.addMethod("numbersAndHyphens", function (value, element) {
  return this.optional(element) || /^[0-9-]*$/.test(value);
}, "Numbers and hyphens only");

$.validator.addMethod("addressPattern", function (value, element) {
  return this.optional(element) || /^[a-zA-Z0-9\s,-]*$/.test(value);
}, "Alphanumeric characters with spaces commas and hyphens only");

$.validator.addMethod("hobbiesPattern", function (value, element) {
  return this.optional(element) || /^[a-zA-Z\s,-]*$/.test(value);
}, "Alphanumeric characters with spaces commas and hyphens only");

$.validator.addMethod("notesPattern", function (value, element) {
  return this.optional(element) || /^[a-zA-Z,.\s]*$/.test(value);
}, "Alphanumeric characters with spaces commas and dots only");

$.validator.addMethod("birthdateValidation", function (value, element) {
  return this.optional(element) || /^\d{4}-\d{2}-\d{2}$/.test(value);
}, "Please enter a valid date in YYYY-MM-DD format.");

$.validator.addMethod("validateDepartment", function (value, element) {
  return value !== null && value.trim() !== "";
}, "Please select a department.");

//Check age is between 18-100 or not.
$.validator.addMethod("validateAge", function (value, element) {
  const birthdate = value;
  const age = calculateAge(birthdate);

  return age >= 18 && age <= 100;
}, "Age must be between 18 and 100");

//Validate salary length 
$.validator.addMethod("validateSalary", function(value, element) {
  var parts = value.split('.');
  if (parts.length >= 2) {
    return parts[0].length >= 3 && parts[0].length <= 10;
  } else {
    return value.length >= 3 && value.length <= 10;
  }
}, "Salary should be between 3 and 10 characters long");

//To check the date is valid or not
$.validator.addMethod("isValidDate", function (value, element) {
 
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
  const dotCount = (salaryValue.match(/\./g) || []).length;

  if (salaryValue !== '') {

    const decimalSalary = parseFloat(salaryValue);
    if (!isNaN(decimalSalary)) {
      salaryInput.val(decimalSalary.toFixed(2));

    }
  }
}

//Generate random number between 1-10 on employee id field
function generateEmployeeID() {
  var employeeID = Math.floor(Math.random() * 10) + 1;
  $('#emp').val(employeeID);
}

// To clear form 
function clearForm() {
  $('#myForm')[0].reset();
  $('#myForm').validate().resetForm();
  $('#myForm .error').removeClass('error');
  generateEmployeeID();
}

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

$('#myForm').validate({
  rules: {
    name: {
      required: true,
      minlength: 3,
      maxlength: 20,
      alphabetsAndSpaces: true
    },

    email: {
      required: true,
      email: true,
      maxlength: 50,
      gmailAndYahoo: true

    },
    dob: {
      required: true,
      date: true,
      birthdateValidation: true,
      isValidDate: true,
      validateAge: true

    },
    phone: {
      required: true,
      digits: true,
      minlength: 7,
      maxlength: 10

    },
    gender: {
      required: true

    },
    'communication[]': {
      required: true

    },
    department: {
      validateDepartment: true

    },
    securitynumber: {
      required: true,
      minlength: 7,
      maxlength: 9,
      numbersAndHyphens: true

    },
    job: {
      required: true,
      minlength: 3,
      maxlength: 50,
      alphabetsAndSpaces: true

    },
    address: {
      required: true,
      addressPattern: true

    },
    salary: {
      validateSalary: true,
      required: true,
      number: true,

    },
    hobbies: {
      required: true,
      minlength: 3,
      maxlength: 25,
      hobbiesPattern: true

    }
  },

  messages: {
    name: {
      minlength: "Name should be at least 3 characters.",
      maxlength: "This feld cannot exceed 20 characters",
      alphabetsAndSpaces: "Alphabets and spaces only."
    },
    email: {
      email: "Please enter a valid email address.",
      pattern: "Should accept gmail.com and yahoo.com only",
      maxlength: "Email cannot exceed 50 characters."
    },
    dob: {
      date: "Please enter a valid date of birth (YYYY-MM-DD format)."
    },
    phone: {
      digits: "Numbers only",
      minlength: "Phone number should be at least 10 digits."
    },
    gender: {
      required: "Please select a gender."
    },
    'communication[]': {
      required: "Select at least one method."
    },
    department: {
      required: "Please select a department."
    },
    securitynumber: {
      minlength: "This field should be atleast 7 characters long",
      maxlength: "This field cannot exceed 9 characters"
    },
    job: {
      minlength: "This field should be 3 characters long",
      maxlength: "This field cannot exceed 50 characters."
    },
    hobbies: {
      minlength: "This field should be 3 characters long",
      maxlength: "This field cannot exceed 25 characters."
    },
    salary: {
      minlength: "Salary should be atleat 3 characters long",
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

var formDataArray = [];

//To save form data 
function saveFormData() {
  var formData = {
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

  var index = -1;
  for (var i = 0; i < formDataArray.length; i++) {
    if (formDataArray[i].empid === formData.empid) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    formDataArray[index] = formData;
  } else {
    formDataArray.push(formData);
  }

  $('#myForm')[0].reset();
}

$('#formDataBody td').addClass('word-wrap');

function deleteFormData(index) {
  formDataArray.splice(index, 1);
  displayData();
}

//To display the saved data in the table
function displayData() {

  $('#formDataBody tbody').empty();
  for (var i = 0; i < formDataArray.length; i++) {
    var formData = formDataArray[i];
    var newRow = $('<tr>');
    newRow.append($('<td>').text(formData.name));
    newRow.append($('<td>').text(formData.gender));
    newRow.append($('<td>').text(formData.dob));
    newRow.append($('<td>').text(formData.securitynumber));
    newRow.append($('<td>').text(formData.address));
    newRow.append($('<td>').text(formData.phone));
    newRow.append($('<td>').text(formData.email));
    newRow.append($('<td>').text(formData.communication.join(', ')));
    newRow.append($('<td>').text(formData.empid));
    newRow.append($('<td>').text(formData.job));
    newRow.append($('<td>').text(formData.department));
    newRow.append($('<td>').text(formData.salary));
    newRow.append($('<td>').text(formData.hobbies));
    newRow.append($('<td>').text(formData.notes));
    var actionCell = $('<td>');
    var editButton = $('<button>').text('Edit');
    var deleteButton = $('<button>').text('Delete');
    var editButton = $('<button>').text('Edit').addClass('edit-button');
    var deleteButton = $('<button>').text('Delete').addClass('delete-button');
    editButton.on('click', function () {
      var indexToEdit = $(this).closest('tr').index();
      editFormData(indexToEdit);
    });

    deleteButton.attr('id', 'deleteButton_' + i);

    deleteButton.on('click', function () {
      var indexToDelete = this.id.split('_')[1];
      deleteFormData(indexToDelete);
    });

    actionCell.append(editButton);
    actionCell.append(deleteButton);

    newRow.append(actionCell);
    $('#formDataBody tbody').append(newRow);
  }
}

//To edit the data 
function editFormData(index) {
  var formData = formDataArray[index];
  $('#name').val(formData.name);
  $('input[name="gender"]').val([formData.gender]);
  $('#dob').val(formData.dob);
  $('#ssn').val(formData.securitynumber);
  $('#address').val(formData.address);
  $('#number').val(formData.phone);
  $('#email').val(formData.email);
  $('input[name="communication[]"]').each(function () {
    if (formData.communication.includes($(this).val())) {
      $(this).prop('checked', true);
    } else {
      $(this).prop('checked', false);
    }
  });

  $('#emp').val(formData.empid);
  $('#job').val(formData.job);
  $('#department').val(formData.department);
  $('#salary').val(formData.salary);
  $('#hobbies').val(formData.hobbies);
  $('#notes').val(formData.notes);
}

$('#clear').click(function () {
  clearForm();
});

$('#salary').on('blur', function () {
  salToDecimal();
});

$('#myForm').submit(function (event) {
  event.preventDefault();

  if ($('#myForm').valid()) {
    saveFormData();
    displayData();
    generateEmployeeID();
  }
});