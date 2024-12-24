import { createEscapeHandler } from './modal.js';

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const message = template.cloneNode(true);
  document.body.append(message);

  const messageElement = document.querySelector(`.${type}`);
  let escapeHandler = null;

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', escapeHandler);
    document.removeEventListener('click', onOutsideClick);
  };

  function onOutsideClick(evt) {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeMessage();
    }
  }

  escapeHandler = createEscapeHandler(closeMessage);

  document.querySelector(`.${type}__button`).addEventListener('click', closeMessage);
  document.addEventListener('keydown', escapeHandler);
  document.addEventListener('click', onOutsideClick);
};

export { showMessage };
