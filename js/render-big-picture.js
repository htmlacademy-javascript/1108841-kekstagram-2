const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector(
  '.social__comment-total-count'
);
const commentsList = bigPicture.querySelector('.social__comments');
const photoDescription = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentCount = bigPicture.querySelector('.social__comment-count');
let isLiked = false;

const renderComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;
  return comment;
};

const renderBigPicture = ({ url, likes, comments, description }) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  totalCommentsCount.textContent = comments.length;
  commentsList.innerHTML = '';

  comments.forEach((comment) => {
    commentsList.append(renderComment(comment));
  });
  photoDescription.textContent = description;
};


likesCount.addEventListener('click', () => {
  if (!isLiked) {
    const currentLikes = parseInt(likesCount.textContent, 10);
    likesCount.textContent = currentLikes + 1;
    isLiked = true;
  } else {
    const currentLikes = parseInt(likesCount.textContent, 10);
    likesCount.textContent = currentLikes - 1;
    isLiked = false;
  }
});

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

function onEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  renderBigPicture(photoData);
  document.addEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
