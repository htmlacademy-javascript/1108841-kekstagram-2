import { openBigPicture } from './render-big-picture.js';

const PICTURE_TEMPLATE = document.querySelector('#picture').content;

const createThumbnail = (picture) => {
  const pictureElement = PICTURE_TEMPLATE.cloneNode(true);
  const img = pictureElement.querySelector('.picture__img');

  img.src = picture.url;
  img.alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent =
    picture.comments.length;

  return pictureElement;
};

const onThumbnailClick = (evt, picture) => {
  evt.preventDefault();
  openBigPicture(picture);
};

const createBigPhotoLink = (thumbnailElement, picture) => {
  const thumbnailLink = thumbnailElement.querySelector('.picture');
  thumbnailLink.addEventListener('click', (evt) => onThumbnailClick(evt, picture));
};

const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnailElement = createThumbnail(picture);
    createBigPhotoLink(thumbnailElement, picture);
    fragment.appendChild(thumbnailElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
