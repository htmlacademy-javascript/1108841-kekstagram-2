import { isEscapeKey } from './utils.js';
import { ModalClass } from './constants.js';

let isErrorShown = false;

const closeModal = (element, callback) => {
  if (isErrorShown) {
    return;
  }
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
  if (isEscapeKey(evt) && !isErrorShown) {
    action();
  }
};

const setErrorState = (state) => {
  isErrorShown = state;
};

export { closeModal, openModal, createEscapeHandler, setErrorState };
