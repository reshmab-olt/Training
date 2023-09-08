const displayInput = document.getElementById('display');
const oneButton = document.getElementById('one');
const twoButton = document.getElementById('two');
const threeButton = document.getElementById('three');
const fourButton = document.getElementById('four');
const fiveButton = document.getElementById('five');
const sixButton = document.getElementById('six');
const sevenButton = document.getElementById('seven');
const eightButton = document.getElementById('eight');
const nineButton = document.getElementById('nine');
const zeroButton = document.getElementById('zero');
const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const mulButton = document.getElementById('mul');
const divButton = document.getElementById('division');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const dotButton = document.getElementById('dot');
let currentInput = '0';
let previousInput = '';
let answer = '';

function updateDisplay() {
  displayInput.value = previousInput;
}

function numberClick(number) {
  if (number === '.' && previousInput.includes('.')) {
    return;
  }
  if (previousInput.includes('=')) {
    return;
  }
  currentInput = number;
  if (currentInput != '') {
    previousInput += currentInput;
    updateDisplay();
  }
}

function operatorClick(op) {
  if (previousInput.includes('=')) {
    return;
  }
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

function clearCalculator(clr) {
  previousInput = clr;
  updateDisplay();
}

function equalClick() {
  answer = math.evaluate(previousInput);
  previousInput += '=' + answer;
  updateDisplay();
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