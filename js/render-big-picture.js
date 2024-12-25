import { closeModal, openModal, createEscapeHandler } from './modal.js';
import { CommentAvatarSize, CommentsSettings, ModalClass } from './constants.js';

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

const bigPictureState = {
  currentComments: [],
  shownComments: 0,
  isLiked: false,
  escapeHandler: null
};

const renderComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = CommentAvatarSize.WIDTH;
  img.height = CommentAvatarSize.HEIGHT;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.append(img, text);
  return comment;
};

const showComments = () => {
  const commentsToShow = bigPictureState.currentComments.slice(
    bigPictureState.shownComments,
    bigPictureState.shownComments + CommentsSettings.COMMENTS_PER_PORTION
  );
  commentsToShow.forEach((comment) => {
    commentsList.append(renderComment(comment));
  });

  bigPictureState.shownComments += commentsToShow.length;
  commentsCount.textContent = bigPictureState.shownComments;

  if (bigPictureState.shownComments >= bigPictureState.currentComments.length) {
    commentsLoader.classList.add(ModalClass.HIDDEN);
  } else {
    commentsLoader.classList.remove(ModalClass.HIDDEN);
  }
};

const renderBigPictureDetails = ({ url, likes, description }) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  photoDescription.textContent = description;
};

const initComments = (comments) => {
  commentsList.innerHTML = '';
  bigPictureState.currentComments = comments;
  bigPictureState.shownComments = 0;
  totalCommentsCount.textContent = comments.length;
};

const renderBigPicture = (photoData) => {
  renderBigPictureDetails(photoData);
  initComments(photoData.comments);
  showComments();
};

const closeBigPicture = () => {
  closeModal(bigPicture, bigPictureState.escapeHandler);
};

const openBigPicture = (photoData) => {
  bigPictureState.escapeHandler = createEscapeHandler(closeBigPicture);
  openModal(bigPicture, bigPictureState.escapeHandler);
  commentCount.classList.remove(ModalClass.HIDDEN);
  renderBigPicture(photoData);
};

likesCount.addEventListener('click', () => {
  if (!bigPictureState.isLiked) {
    const currentLikes = parseInt(likesCount.textContent, 10);
    likesCount.textContent = currentLikes + 1;
    bigPictureState.isLiked = true;
  } else {
    const currentLikes = parseInt(likesCount.textContent, 10);
    likesCount.textContent = currentLikes - 1;
    bigPictureState.isLiked = false;
  }
});

commentsLoader.addEventListener('click', showComments);
closeButton.addEventListener('click', closeBigPicture);

export { openBigPicture };
