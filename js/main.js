import { renderPictures } from './render-thumbnails.js';
import { getData } from './api.js';
import { showError } from './show-error.js';
import './form.js';

const initGallery = async () => {
  try {
    const pictures = await getData();
    renderPictures(pictures);
  } catch (err) {
    showError(err.message);
  }
};

initGallery();
