import { setErrorState } from './modal.js';

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const message = template.cloneNode(true);
  document.body.append(message);

  const messageElement = document.querySelector(`.${type}`);
  let escapeHandler = null;

  if (type === 'error') {
    setErrorState(true);
  }

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', escapeHandler);
    document.removeEventListener('click', onOutsideClick);
    if (type === 'error') {
      setErrorState(false);
    }
  };

  function onOutsideClick(evt) {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeMessage();
    }
  }

  escapeHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      closeMessage();
    }
  };

  document.querySelector(`.${type}__button`).addEventListener('click', closeMessage);
  document.addEventListener('keydown', escapeHandler);
  document.addEventListener('click', onOutsideClick);
};

export { showMessage };
