import { isEscapeKey } from './utils.js';
import { ModalClass } from './constants.js';

const modalState = {
  isErrorMessageShown: false
};

const closeModal = (element, callback) => {
  if (modalState.isErrorMessageShown) {
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
  if (isEscapeKey(evt) && !modalState.isErrorMessageShown) {
    action();
  }
};

const setErrorState = (state) => {
  modalState.isErrorMessageShown = state;
};

export { closeModal, openModal, createEscapeHandler, setErrorState };
