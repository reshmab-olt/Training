$(document).ready(function () {
    var displayValue = '';
    var firstOperand = null;
    var operator = null;

    // Function to update the display with the current value
    function updateDisplay() {
        $('#display').val(displayValue);
    }

    // Click event handlers for numeric buttons
    $('.btn').not('#clear, #equal').click(function () {
        var buttonValue = $(this).text();

        // Append the clicked value to the display
        displayValue += buttonValue;
        updateDisplay();
    });

    // Click event handler for operator buttons
    $('#add, #sub, #mul, #division').click(function () {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            operator = $(this).text();
            displayValue = '';
        }
    });

    // Click event handler for the equal button
    $('#equal').click(function () {
        if (firstOperand !== null && operator !== null) {
            var secondOperand = parseFloat(displayValue);

            // Perform the operation based on the operator
            if (operator === '+') {
                displayValue = (firstOperand + secondOperand).toString();
            } else if (operator === '-') {
                displayValue = (firstOperand - secondOperand).toString();
            } else if (operator === '*') {
                displayValue = (firstOperand * secondOperand).toString();
            } else if (operator === '/') {
                if (secondOperand !== 0) {
                    displayValue = (firstOperand / secondOperand).toString();
                } else {
                    displayValue = 'Error';
                }
            }

            // Reset operands and operator
            firstOperand = null;
            operator = null;

            updateDisplay();
        }
    });

    // Click event handler for the clear button
    $('#clear').click(function () {
        displayValue = '';
        firstOperand = null;
        operator = null;
        updateDisplay();
    });
});
