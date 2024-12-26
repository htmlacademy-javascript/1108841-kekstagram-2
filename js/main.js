import { getData } from './api.js';
import { showError } from './show-error.js';
import { renderPictures } from './render-thumbnails.js';
import { initFilters } from './filter.js';
import './form.js';

const initApp = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
    initFilters(photos);
  } catch (err) {
    showError(err.message);
  }
};

initApp();
