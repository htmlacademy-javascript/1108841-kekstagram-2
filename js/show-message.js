import { setErrorState } from './modal.js';

const showMessage = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const messageContainer = document.querySelector(`.${type}`);
  let onMessageEscKeydown = null;
  let onMessageOutsideClick = null;

  const onMessageButtonClick = () => {
    messageContainer.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageOutsideClick);
    if (type === 'error') {
      setErrorState(false);
    }
  };

  onMessageOutsideClick = (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      onMessageButtonClick();
    }
  };

  onMessageEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      onMessageButtonClick();
    }
  };

  if (type === 'error') {
    setErrorState(true);
  }

  document.querySelector(`.${type}__button`).addEventListener('click', onMessageButtonClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageOutsideClick);
};

export { showMessage };
