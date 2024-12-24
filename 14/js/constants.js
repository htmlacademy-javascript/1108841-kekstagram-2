const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const ErrorMessage = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
  HASHTAG_COUNT: 'Нельзя указать больше пяти хэштегов',
  HASHTAG_DUPLICATE: 'Один и тот же хэштег не может быть использован дважды',
  HASHTAG_EMPTY: 'Хэштег не может состоять только из решётки',
  HASHTAG_START: 'Хэштег должен начинаться с символа #',
  HASHTAG_LENGTH: 'Максимальная длина хэштега 20 символов, включая решётку',
  HASHTAG_PATTERN: 'Хэштег может содержать только буквы и цифры',
  COMMENT_LENGTH: 'Комментарий не может быть длиннее 140 символов'
};

const ValidationSettings = {
  MAX_HASHTAGS: 5,
  MAX_COMMENT_LENGTH: 140,
  VALID_HASHTAG_PATTERN: /^#[a-zа-яё0-9]{1,19}$/i
};

const CommentsSettings = {
  COMMENTS_PER_PORTION: 5
};

const FilterSettings = {
  RANDOM_PHOTOS_COUNT: 10,
  DEBOUNCE_DELAY: 500
};

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const ModalClass = {
  HIDDEN: 'hidden',
  MODAL_OPEN: 'modal-open'
};

export {
  SubmitButtonText,
  ErrorMessage,
  ValidationSettings,
  CommentsSettings,
  FilterSettings,
  Filter,
  ModalClass
};
