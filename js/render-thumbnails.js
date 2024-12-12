const renderPictures = (pictures) => {
  const picturesContainer = document.querySelector('.pictures');
  const template = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = template.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').alt = picture.description;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      picture.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};
export { renderPictures };
