
    $(document).ready(function () {
      const displayInput = $('#display');
      const oneButton = $('#one');
      const twoButton = $('#two');
      const threeButton = $('#three');
      const fourButton = $('#four');
      const fiveButton = $('#five');
      const sixButton = $('#six');
      const sevenButton = $('#seven');
      const eightButton = $('#eight');
      const nineButton = $('#nine');
      const zeroButton = $('#zero');
      const addButton = $('#add');
      const subButton = $('#sub');
      const mulButton = $('#mul');
      const divButton = $('#division');
      const clearButton = $('#clear');
      const equalButton = $('#equal');
      const dotButton = $('#dot');

      let currentInput = '0';
      let previousInput = '';
      let answer = '';

      function updateDisplay() {
        displayInput.val(previousInput);
      }

      function numberClick(number) {
        if (number === '.' && currentInput.includes('.')) {
          return;
        }

        currentInput = number;

        if (currentInput !== '') {
          previousInput += currentInput;
          updateDisplay();
        }
      }

      function operatorClick(op) {
        if (currentInput === 'operator') {
          return;
        }

        if (!isOperator(currentInput)) {
          currentInput = op;
          previousInput += currentInput;
          updateDisplay();
        }
      }

      function isOperator(input) {
        return ['+', '-', '*', '/'].includes(input);
      }

      function clearCalculator() {
        previousInput = '';
        updateDisplay();
      }

      function equalClick() {
        if (previousInput === '') {
          previousInput = '';
          updateDisplay();
          return;
        }

        answer = math.evaluate(previousInput);
        previousInput = answer.toString();
        updateDisplay();
        currentInput = previousInput;
      }

      sevenButton.click(() => numberClick('7'));
      eightButton.click(() => numberClick('8'));
      nineButton.click(() => numberClick('9'));
      addButton.click(() => operatorClick('+'));
      fourButton.click(() => numberClick('4'));
      fiveButton.click(() => numberClick('5'));
      sixButton.click(() => numberClick('6'));
      subButton.click(() => operatorClick('-'));
      oneButton.click(() => numberClick('1'));
      twoButton.click(() => numberClick('2'));
      threeButton.click(() => numberClick('3'));
      mulButton.click(() => operatorClick('*'));
      clearButton.click(() => clearCalculator());
      zeroButton.click(() => numberClick('0'));
      equalButton.click(() => equalClick());
      divButton.click(() => operatorClick('/'));
      dotButton.click(() => numberClick('.'));
      updateDisplay();
    });
 