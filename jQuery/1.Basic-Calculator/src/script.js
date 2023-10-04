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
});
