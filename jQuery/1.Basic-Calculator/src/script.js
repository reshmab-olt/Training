$(document).ready(function() {
    var display = $("#display");
    var clearButton = $("#clear");
    var equalButton = $("#equal");

    clearButton.click(function() {
        display.val("");
    });

    $(".btn-secondary").not(equalButton).not(clearButton).click(function() {
        var currentVal = display.val();
        var buttonVal = $(this).text();

        if (/[-+*/]$/.test(currentVal) && /[-+*/]/.test(buttonVal)) {
            return; 
        }
        display.val(currentVal + buttonVal);
    });

    equalButton.click(function() {
        try {
            var result = math.evaluate(display.val());
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
