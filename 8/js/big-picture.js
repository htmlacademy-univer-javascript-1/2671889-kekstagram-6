import { isEscapeKeyPressed, toggleClass } from './util.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

let currentCommentsShownCount = COMMENTS_STEP;
let currentShownPhoto = null;

const toggleModal = () => {
  toggleClass(bigPicture, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const createCommentElement = (commentObject) => {
  const { avatar, name, message } = commentObject;
  const li = document.createElement('li');
  li.className = 'social__comment';
  li.innerHTML = `
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35"
      height="35">
    <p class="social__text">${message}</p>
  `;
  return li;
};

const renderComments = (commentObjects) => {
  socialComments.innerHTML = '';

  if (currentCommentsShownCount > commentObjects.length) {
    currentCommentsShownCount = commentObjects.length;
  }

  socialCommentCount.innerHTML = `
    ${currentCommentsShownCount} из
    <span class="comments-count">
      ${commentObjects.length}
    </span> комментариев
  `;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < currentCommentsShownCount; i++) {
    fragment.appendChild(createCommentElement(commentObjects[i]));
  }
  socialComments.appendChild(fragment);

  if (
    commentObjects.length <= COMMENTS_STEP ||
    currentCommentsShownCount >= commentObjects.length
  ) {
    commentsLoader.classList.add('hidden');
  }
};

const fillBigPictureData = (photoObject) => {
  const { url, description, likes, comments } = photoObject;
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
};

const openBigPicture = (photoObject) => {
  currentShownPhoto = photoObject;
  fillBigPictureData(photoObject);
  renderComments(photoObject.comments);
  toggleModal();

  document.addEventListener('keydown', onPressEscape);
};

const closeBigPicture = () => {
  socialComments.innerHTML = '';
  socialCommentCount.innerHTML = '';
  currentCommentsShownCount = COMMENTS_STEP;
  toggleModal();
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPressEscape);
};

const onClickBigPictureCancel = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onClickCommentsLoader = (evt) => {
  evt.preventDefault();
  currentCommentsShownCount += COMMENTS_STEP;
  renderComments(currentShownPhoto ? currentShownPhoto.comments : [{}]);
};

function onPressEscape(evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

commentsLoader.addEventListener('click', onClickCommentsLoader);
bigPictureCancel.addEventListener('click', onClickBigPictureCancel);

export { openBigPicture };
