import squareSumsRow from './squareSums.js';

const n = document.querySelector('#n');
const form = document.querySelector('form');
const resultField = document.querySelector('#resultField');

const onFormSubmit = (e) => {
  e.preventDefault();

  const result = squareSumsRow(parseInt(n.value));

  resultField.textContent = result ? `[ ${result.join(', ')} ]` : 'No result';

  n.value = '';
};

form.addEventListener('submit', onFormSubmit);
