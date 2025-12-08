import { openBigPicture } from './big-picture.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const addClickOnPhotoListener = (pictureElement, photoObject) => {
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photoObject);
  });
};

const fillPictureElementData = (pictureElement, photoObject) => {
  const { url, description, comments, likes } = photoObject;
  const img = pictureElement.querySelector('.picture__img');
  const commentsSpan = pictureElement.querySelector('.picture__comments');
  const likesSpan = pictureElement.querySelector('.picture__likes');
  img.src = url;
  img.alt = description;
  commentsSpan.textContent = comments.length;
  likesSpan.textContent = likes;
};

const createPictureElement = (photoObject) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  fillPictureElementData(pictureElement, photoObject);
  addClickOnPhotoListener(pictureElement, photoObject);
  return pictureElement;
};

const renderPhotos = (photoObjects) => {
  const fragment = document.createDocumentFragment();
  for (const photoObject of photoObjects) {
    fragment.appendChild(createPictureElement(photoObject));
  }
  picturesContainer.appendChild(fragment);
};

export { renderPhotos };
