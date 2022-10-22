'use strict';

function Calculate(firstValue, secondValue, operator) {
  let result;
  switch (operator) {
    case 'add':
      result = firstValue + secondValue;
      break;
    case 'subtract':
      result = firstValue - secondValue;
      break;
    case 'multiply':
      result = firstValue * secondValue;
      break;
    case 'divide':
      result = firstValue / secondValue;
      break;
  }

  return result;
}

const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.display');

keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = e.target.dataset.action;
    const keyContent = e.target.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    // If a number is clicked
    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'equals'
      ) {
        display.textContent = keyContent;
        calculator.dataset.previousKeyType = 'number';
      } else {
        display.textContent += keyContent;
      }
    }

    // If a decimal is clicked

    if (action === 'decimal') {
      if (!displayedNum.includes('.') && previousKeyType !== 'operator') {
        display.textContent += '.';
      } else {
        display.textContent = '0.';
      }
      calculator.dataset.previousKeyType = 'decimal';
    }

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = +calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = +displayedNum;
      console.log(firstValue, secondValue, operator);

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'equals'
      ) {
        display.textContent = Calculate(firstValue, secondValue, operator);
        console.log(display.textContent);
      }
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = display.textContent;
      calculator.dataset.operator = action;

      // console.log(
      //   calculator.dataset.firstValue,
      //   calculator.dataset.secondValue,
      //   calculator.dataset.operator
      // );
    }

    if (action === 'equals') {
      let secondValue = +displayedNum;
      let firstValue = +calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      console.log(
        firstValue,
        operator,
        secondValue,
        calculator.dataset.previousKeyType
      );
      if (firstValue) {
        if (previousKeyType === 'equals') {
          firstValue = +displayedNum;
          secondValue = +calculator.dataset.modValue;
        }
        display.textContent = Calculate(firstValue, secondValue, operator);
      }

      calculator.dataset.previousKeyType = 'equals';
      calculator.dataset.modValue = secondValue;
    }

    if (action === 'clear') {
      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }

    if (action === 'delete') {
      calculator.dataset.firstValue = '';
      calculator.dataset.operator = '';
      calculator.dataset.modValue = '';
      calculator.dataset.previousKeyType = '';
      display.textContent = 0;
      calculator.dataset.previousKeyType = 'delete';
    }
  }
});
