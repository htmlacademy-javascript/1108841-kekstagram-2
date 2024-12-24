import { isEscapeKey } from './utils.js';
import { ModalClass } from './constants.js';

const closeModal = (element, callback) => {
  element.classList.add(ModalClass.HIDDEN);
  document.body.classList.remove(ModalClass.MODAL_OPEN);
  document.removeEventListener('keydown', callback);
};

const openModal = (element, callback) => {
  element.classList.remove(ModalClass.HIDDEN);
  document.body.classList.add(ModalClass.MODAL_OPEN);
  document.addEventListener('keydown', callback);
};

const createEscapeHandler = (action) => (evt) => {
  if (isEscapeKey(evt)) {
    action();
  }
};

export { closeModal, openModal, createEscapeHandler };
