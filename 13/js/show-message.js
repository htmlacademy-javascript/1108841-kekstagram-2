import { isEscapeKey } from './utils.js';

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const message = template.cloneNode(true);
  document.body.append(message);

  const closeMessage = () => {
    document.querySelector(`.${type}`).remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeyDown(evt) {
    if (isEscapeKey(evt)) {
      closeMessage();
    }
  }

  function onOutsideClick(evt) {
    if (!evt.target.closest(`.${type}__inner`)) {
      closeMessage();
    }
  }

  document.querySelector(`.${type}__button`).addEventListener('click', closeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

export { showMessage };
