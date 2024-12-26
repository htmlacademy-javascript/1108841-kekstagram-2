import { Filter, FilterSettings } from './constants.js';
import { renderPictures } from './render-thumbnails.js';
import { createDebounced } from './utils.js';

const filterElement = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const getRandomPhotos = (photos) => {
  const photosCopy = [...photos];
  return photosCopy.slice(0, FilterSettings.RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) =>
  [...photos].sort((a, b) => b.comments.length - a.comments.length);

const filterHandlers = {
  [Filter.DEFAULT]: (photos) => photos,
  [Filter.RANDOM]: getRandomPhotos,
  [Filter.DISCUSSED]: getDiscussedPhotos
};

const repaint = (photos, id) => {
  const filteredPhotos = filterHandlers[id](photos);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
  renderPictures(filteredPhotos);
};

const debouncedRepaint = createDebounced(repaint, FilterSettings.DEBOUNCE_DELAY);

const onFilterButtonClick = (evt, photos) => {
  const clickedButton = evt.target;

  if (!clickedButton.classList.contains('img-filters__button') ||
      clickedButton.classList.contains('img-filters__button--active')) {
    return;
  }

  const activeButton = filterForm.querySelector('.img-filters__button--active');
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }

  clickedButton.classList.add('img-filters__button--active');
  debouncedRepaint(photos, clickedButton.id);
};

const initFilters = (photos) => {
  if (!filterElement || !filterForm || !photos?.length) {
    return;
  }

  filterElement.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => onFilterButtonClick(evt, photos));
};

export { initFilters };
