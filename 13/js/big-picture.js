import { isEscapeKeyPressed, toggleClass } from './util.js';

const COMMENTS_STEP = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentCommentsShownCount = COMMENTS_STEP;
let currentShownPhoto = null;

const toggleModal = () => {
  toggleClass(bigPictureElement, 'hidden');
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
  socialCommentsElement.innerHTML = '';

  if (currentCommentsShownCount > commentObjects.length) {
    currentCommentsShownCount = commentObjects.length;
  }

  socialCommentCountElement.innerHTML = `${currentCommentsShownCount} из <span class="comments-count">${commentObjects.length}</span> комментариев`;

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < currentCommentsShownCount; i++) {
    fragment.appendChild(createCommentElement(commentObjects[i]));
  }
  socialCommentsElement.appendChild(fragment);

  if (
    commentObjects.length <= COMMENTS_STEP ||
    currentCommentsShownCount >= commentObjects.length
  ) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const fillBigPictureData = (photoObject) => {
  const { url, description, likes, comments } = photoObject;
  bigPictureImgElement.src = url;
  bigPictureImgElement.alt = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  socialCaptionElement.textContent = description;
};

const openBigPicture = (photoObject) => {
  currentShownPhoto = photoObject;
  fillBigPictureData(photoObject);
  renderComments(photoObject.comments);
  toggleModal();

  document.addEventListener('keydown', onPressEscape);
};

const closeBigPicture = () => {
  socialCommentsElement.innerHTML = '';
  socialCommentCountElement.innerHTML = '';
  currentCommentsShownCount = COMMENTS_STEP;
  toggleModal();
  commentsLoaderElement.classList.remove('hidden');
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

commentsLoaderElement.addEventListener('click', onClickCommentsLoader);
bigPictureCancelElement.addEventListener('click', onClickBigPictureCancel);

export { openBigPicture };
