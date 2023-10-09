let display = $("#display");
const clearButton = $("#clear");
const equalButton = $("#equal");

//Calculation
function calculateResult() {
    try {
        let result = math.evaluate(display.val());
        if (!isNaN(result) && result % 1 !== 0) {
            result = result.toFixed(14);
            result = result.replace(/(\.[0-9]*[1-9])0+$/, "$1");
        }
        display.val(result.toString());
    } catch (error) {
        display.val("Error");
    }
}

<<<<<<< Updated upstream
$(".input").click(function () {
    let currentVal = display.val();
    let buttonVal = $(this).text();
    
    if (currentVal === "Error") {
        display.val(buttonVal); 
    } else if (buttonVal === "." && currentVal.endsWith(".")) {
        return;
    } else {
        display.val(currentVal + buttonVal);
    }
});

equalButton.click(function () {
    calculateResult();
});

clearButton.click(function () {
    display.val("");
=======
    // Function to clear the display and related variables
    function clearDisplay() {
        displayValue = '';
        firstOperand = null;
        operator = null;
        updateDisplay();

        // Add this logic to clear the display in the first code snippet
        $displayNumber.html('');
        $displayOperator.html('');
        inputHistory = '';
        currentInput = '';
        hasOperator = false;
        operator = '';
        expression = '';
        equal = false;
        count = 0;
    }

    // Click event handlers for numeric buttons
    $('.btn').not('#clear, #equal').click(function () {
        var buttonValue = $(this).text();

        displayValue += buttonValue;
        updateDisplay();

        // Add this logic to keep track of input history in the first code snippet
        addNumberToDisplay(buttonValue);
    });

    // Click event handlers for operator buttons
    $('#add, #sub, #mul, #division').click(function () {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
            operator = $(this).text();
            displayValue = '';

            // Add this logic to keep track of the operator in the first code snippet
            addOperatorToDisplay(operator);
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

            // Add this logic to handle the calculation in the first code snippet
            calculate();
        }
    });

    // Click event handler for the clear button
    $('#clear').click(function () {
        clearDisplay();
    });
>>>>>>> Stashed changes
});
