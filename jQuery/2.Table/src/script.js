$(document).ready(function () {
  $.validator.addMethod("alphabetsAndSpaces", function(value, element) {
      return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
  }, "Alphabets and spaces only.");

  $.validator.addMethod("gmailAndYahoo", function(value, element) {
      return this.optional(element) || /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/i.test(value);
  }, "Should accept gamil.com and yahoo.com only");

  $.validator.addMethod("numbersAndHyphens", function(value, element) {
      return this.optional(element) || /^[0-9-]*$/.test(value);
  }, "Numbers and hyphens only");

  $.validator.addMethod("addressPattern", function(value, element) {
      return this.optional(element) ||  /^[a-zA-Z0-9\s,-]*$/.test(value);
  }, "Alphanumeric characters with spaces commas and hyphens only");

  $.validator.addMethod("hobbiesPattern", function(value, element) {
      return this.optional(element) ||  /^[a-zA-Z\s,-]*$/.test(value);
  }, "Alphanumeric characters with spaces commas and hyphens only");

  $.validator.addMethod("notesPattern", function(value, element) {
  return this.optional(element) ||   /^[a-zA-Z,.\s]*$/.test(value);
  }, "Alphanumeric characters with spaces commas and dots only");


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
              maxlength:50,
              gmailAndYahoo:true
              
          },
          dob: {
              required: true,
              date: true
          },
          phone: {
              required: true,
              digits: true,
              minlength: 7,
              maxlength:10
          },
          gender: {
              required: true
          },
          'communication[]': {
              required: true
          },
          department: {
              required: true
          },
          securitynumber: {
              required: true,
              minlength:7,
              maxlength:9,
              numbersAndHyphens:true

          },
          job: {
              required: true,
              minlength:3,
              maxlength:50,
              alphabetsAndSpaces:true
              
          },
          address:{
              required:true,
              addressPattern:true
          },
          hobbies: {
              required: true,
              minlength:3,
              maxlength:25,
              hobbiesPattern:true
              
          }
      },
      
      messages: {
          name: {
              required: "This field is required",
              minlength: "Name should be at least 3 characters.",
              maxlength: "This feld cannot exceed 20 characters",
              alphabetsAndSpaces: "Alphabets and spaces only."  
          },
          email: {
              required: "This field is required",
              email: "Please enter a valid email address.",
              pattern : "Should accept gmail.com and yahoo.com only",
              
          },
          dob: {
              required: "This field is required",
              date: "Please enter a valid date of birth (YYYY-MM-DD format)."
          },
          phone: {
              required: "This field is required",
              digits: "Please enter only digits.",
              minlength: "Phone number should be at least 10 digits."
          },
          gender: {
              required: "Please select a gender."
          },
          'communication[]': {
              required: "Please select at least one communication method."
          },
          department: {
              required: "Please select a department."
          },
          securitynumber: {
              required: "This field is required",
          },
          job: {
              required: "This field is required",
          },
          hobbies: {
              required: "This field is required",
          }
      },
      errorElement: 'span',
      errorPlacement: function (error, element) {
          error.insertAfter(element);
      }
  });

  $('#myForm').submit(function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
  
      if ($('#myForm').valid()) {
          saveFormData(); // Call saveFormData to store the form data
          displayData();
      }
  });
  
  

var formDataArray = [];

function saveFormData() {
var formData = {
  name: $('#name').val(),
  gender: $('input[name="gender"]:checked').val(),
  dob: $('#dob').val(),
  securitynumber: $('#ssn').val(),
  address: $('#address').val(),
  phone: $('#phone').val(),
  email: $('#email').val(),
  communication: $('input[name="communication[]"]:checked')
    .map(function () {
      return this.value;
    })
    .get(),
    job: $('#job').val(),
  department: $('#department').val(),
  salary: $('#salary').val(),
  hobbies: $('#hobbies').val(),
  notes: $('#notes').val(),
};

formDataArray.push(formData);

//   $('#myForm')[0].reset();
}


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
        newRow.append($('<td>').text(formData.job));
        newRow.append($('<td>').text(formData.department));
        newRow.append($('<td>').text(formData.salary));
        newRow.append($('<td>').text(formData.hobbies));
        newRow.append($('<td>').text(formData.notes));
        $('#formDataBody tbody').append(newRow);
      }
    }

});