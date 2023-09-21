const displayInput = document.querySelector('#display');
const oneButton = document.querySelector('#one');
const twoButton = document.querySelector('#two');
const threeButton = document.querySelector('#three');
const fourButton = document.querySelector('#four');
const fiveButton = document.querySelector('#five');
const sixButton = document.querySelector('#six');
const sevenButton = document.querySelector('#seven');
const eightButton = document.querySelector('#eight');
const nineButton = document.querySelector('#nine');
const zeroButton = document.querySelector('#zero');
const addButton = document.querySelector('#add');
const subButton = document.querySelector('#sub');
const mulButton = document.querySelector('#mul');
const divButton = document.querySelector('#division');
const clearButton = document.querySelector('#clear');
const equalButton = document.querySelector('#equal');
const dotButton = document.querySelector('#dot');

let currentInput = '';

let previousInput = '';

let answer = 0;

function updateDisplay() {
  displayInput.value = previousInput;
}

function numberClick(number) {
  if (number === '.' && currentInput.includes('.')) {
    return;
  }

  if (isOperator(number)) {
    currentInput = '';
  }

  currentInput += number;
  previousInput += number;
  updateDisplay();
}

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
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

function clearCalculator(clr) {
  previousInput = clr;
  updateDisplay();
}

function equalClick() {
  if (previousInput === '') {
    return;
  }
  answer = math.evaluate(previousInput);
  previousInput = ' ';
  previousInput = answer;
  updateDisplay();
  currentInput = previousInput;
}

sevenButton.addEventListener('click', () => numberClick('7'));
eightButton.addEventListener('click', () => numberClick('8'));
nineButton.addEventListener('click', () => numberClick('9'));
addButton.addEventListener('click', () => operatorClick('+'));
fourButton.addEventListener('click', () => numberClick('4'));
fiveButton.addEventListener('click', () => numberClick('5'));
sixButton.addEventListener('click', () => numberClick('6'));
subButton.addEventListener('click', () => operatorClick('-'));
oneButton.addEventListener('click', () => numberClick('1'));
twoButton.addEventListener('click', () => numberClick('2'));
threeButton.addEventListener('click', () => numberClick('3'));
mulButton.addEventListener('click', () => operatorClick('*'));
clearButton.addEventListener('click', () => clearCalculator(''));
zeroButton.addEventListener('click', () => numberClick('0'));
equalButton.addEventListener('click', () => equalClick());
divButton.addEventListener('click', () => operatorClick('/'));
dotButton.addEventListener('click', () => numberClick('.'));
updateDisplay();