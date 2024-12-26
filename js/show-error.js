import { ErrorSettings } from './constants.js';

const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = message;
  document.body.append(errorElement);

  setTimeout(() => {
    if (errorElement && document.body.contains(errorElement)) {
      errorElement.remove();
    }
  }, ErrorSettings.SHOW_DELAY);
};

export { showError };
