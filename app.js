'use strict';

const containerEl = document.querySelector('.container');
const gridSizeEl = document.querySelector('#size');
const colorEl = document.querySelector('#color');
const clearGridBtn = document.querySelector('button');

const clearGrid = function () {
  containerEl.innerHTML = '';
};

const displayGrid = function (numBoxes = 24) {
  const widthBox = 480 / numBoxes;
  let boxGeneratingHTML = '';
  for (let i = 0; i < numBoxes * numBoxes; i++) {
    const el = `<div class='box'></div>`;
    boxGeneratingHTML += el;
  }

  containerEl.insertAdjacentHTML('afterbegin', boxGeneratingHTML);
  const boxes = document.querySelectorAll('.box');
  boxes.forEach((box) => {
    box.style.width = `${widthBox}px`;
    box.style.height = `${widthBox}px`;
    box.addEventListener('mouseover', function (e) {
      e.target.style.backgroundColor = colorEl.value;
    });
  });
};

displayGrid();

gridSizeEl.addEventListener('input', function () {
  this.labels[0].textContent = `Grid Size: ${this.value}`;
});

gridSizeEl.addEventListener('change', function () {
  clearGrid();
  displayGrid(this.value);
});

clearGridBtn.addEventListener('click', function () {
  clearGrid();
  displayGrid(gridSizeEl.value);
});
