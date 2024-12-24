const SHOW_ERROR_TIME = 5000;

const showError = (message) => {
  const errorTemplate = document.querySelector('#data-error').content;
  const error = errorTemplate.cloneNode(true);
  error.querySelector('.data-error__title').textContent = message;
  document.body.append(error);

  setTimeout(() => {
    error.remove();
  }, SHOW_ERROR_TIME);
};

export { showError };
