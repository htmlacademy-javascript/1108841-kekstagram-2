import { Key } from './constants.js';

const isEscapeKey = (evt) => evt.key === Key.ESCAPE;

const createDebounced = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, createDebounced };
