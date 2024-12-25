const ERROR_SHOW_DELAY = 5000;

const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.data-error__title').textContent = message;
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_SHOW_DELAY);
};

export { showError };
