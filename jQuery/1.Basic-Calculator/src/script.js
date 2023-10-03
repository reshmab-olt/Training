$(document).ready(function() {
    let display = $("#display");
    const clearButton = $("#clear");
    const equalButton = $("#equal");

    clearButton.click(function() {
        display.val("");
    });

    $(".btn-secondary").not(equalButton).not(clearButton).click(function() {
        let currentVal = display.val();
        let buttonVal = $(this).text();

        if (/[-+*/]$/.test(currentVal) && /[-+*/]/.test(buttonVal)) {
            return; 
        }
        display.val(currentVal + buttonVal);
    });

    equalButton.click(function() {
        try {
            let result = math.evaluate(display.val());
            display.val(result.toString());
        } catch (error) {
            display.val("Error");
        }
    });
    $("#dot").click(function() {
        var currentVal = display.val();                           
        if (currentVal.indexOf(".") === -1) {
            display.val(currentVal + ".");
        }
    });
    
});
