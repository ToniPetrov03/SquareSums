import squareSumsRow from './squareSums.js';

const n = document.querySelector('#n');
const form = document.querySelector('form');
const numField = document.querySelector('#numField');
const resultField = document.querySelector('#resultField');

const onFormSubmit = (e) => {
  e.preventDefault();

  const num = parseInt(n.value);

  numField.textContent = `N = ${num}`;

  try {
    const result = squareSumsRow(num);

    resultField.textContent = result ? `[ ${result.join(', ')} ]` : 'No result';
  } catch (err) {
    console.error(err);

    resultField.textContent = 'N is too big';
  }

  n.value = '';
};

form.addEventListener('submit', onFormSubmit);
