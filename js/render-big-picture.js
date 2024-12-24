import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PORTION = 5;
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
let currentComments = [];
let shownComments = 0;

const renderComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;
  return comment;
};

const showComments = () => {
  const commentsToShow = currentComments.slice(
    shownComments,
    shownComments + COMMENTS_PER_PORTION
  );
  commentsToShow.forEach((comment) => {
    commentsList.append(renderComment(comment));
  });

  shownComments += commentsToShow.length;
  commentsCount.textContent = shownComments;

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const renderBigPictureDetails = ({ url, likes, description }) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  photoDescription.textContent = description;
};

const initComments = (comments) => {
  commentsList.innerHTML = '';
  currentComments = comments;
  shownComments = 0;
  totalCommentsCount.textContent = comments.length;
};

const renderBigPicture = (photoData) => {
  renderBigPictureDetails(photoData);
  initComments(photoData.comments);
  showComments();
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
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
}

const openBigPicture = (photoData) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCount.classList.remove('hidden');

  renderBigPicture(photoData);
  document.addEventListener('keydown', onEscKeyDown);
};

commentsLoader.addEventListener('click', showComments);

closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
