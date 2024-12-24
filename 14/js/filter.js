import { Filter, FilterSettings } from './constants.js';
import { renderPictures } from './render-thumbnails.js';
import { debounce } from './utils.js';

const filterElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const getRandomPhotos = (photos) => {
  const photosCopy = [...photos];
  const randomPhotos = [];

  while (randomPhotos.length < FilterSettings.RANDOM_PHOTOS_COUNT && photosCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * photosCopy.length);
    randomPhotos.push(photosCopy[randomIndex]);
    photosCopy.splice(randomIndex, 1);
  }

  return randomPhotos;
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const filterHandlers = {
  [Filter.DEFAULT]: (photos) => photos,
  [Filter.RANDOM]: getRandomPhotos,
  [Filter.DISCUSSED]: getDiscussedPhotos
};

const repaint = (photos, id) => {
  if (!filterHandlers[id]) {
    return;
  }
  const filteredPhotos = filterHandlers[id](photos);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
  renderPictures(filteredPhotos);
};

const debouncedRepaint = debounce(repaint, FilterSettings.DEBOUNCE_DELAY);

const initFilters = (photos) => {
  if (!filterElement || !filterForm || !photos?.length) {
    return;
  }

  filterElement.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const activeButton = filterForm.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');

    debouncedRepaint(photos, evt.target.id);
  });
};

export { initFilters };
