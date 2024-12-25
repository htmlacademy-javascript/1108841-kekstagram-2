import '../vendor/pristine/pristine.min.js';
import { initEffects, initScale, resetEffects } from './image-effects.js';
import { sendData } from './api.js';
import { showMessage } from './show-message.js';
import { isEscapeKey } from './utils.js';
import { SubmitButtonText, ErrorMessage } from './constants.js';
import { validateHashtags, validateComment, getHashtagsErrorMessage } from './validate-form.js';
import { closeModal, openModal, createEscapeHandler } from './modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancel = uploadForm.querySelector('.img-upload__cancel');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');
let escapeHandler = null;

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  getHashtagsErrorMessage,
  1,
  true
);

pristine.addValidator(
  commentInput,
  validateComment,
  ErrorMessage.COMMENT_LENGTH,
  2,
  true
);

const blockSubmitButton = () => {
  const submitButton = uploadForm.querySelector('.img-upload__submit');
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  const submitButton = uploadForm.querySelector('.img-upload__submit');
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const closeUploadOverlay = () => {
  closeModal(uploadOverlay, escapeHandler);
  uploadForm.reset();
  pristine.reset();
  resetEffects();
};

const onUploadInputChange = () => {
  const file = uploadInput.files[0];

  if (file && isValidType(file)) {
    previewImage.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${previewImage.src}')`;
    });
  }

  escapeHandler = createEscapeHandler(closeUploadOverlay);
  openModal(uploadOverlay, escapeHandler);
  initEffects();
  initScale();
};

const onUploadFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  try {
    blockSubmitButton();
    await sendData(new FormData(uploadForm));
    unblockSubmitButton();
    closeUploadOverlay();
    showMessage('success');
  } catch (err) {
    unblockSubmitButton();
    showMessage('error');
  }
};

const preventEscClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

uploadInput.addEventListener('change', onUploadInputChange);
uploadCancel.addEventListener('click', closeUploadOverlay);
uploadForm.addEventListener('submit', onUploadFormSubmit);
hashtagInput.addEventListener('keydown', preventEscClose);
commentInput.addEventListener('keydown', preventEscClose);

hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
});

export { closeUploadOverlay };
