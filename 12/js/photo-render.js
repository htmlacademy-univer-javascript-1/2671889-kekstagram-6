import { openBigPicture } from './big-picture.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

const addClickOnPhotoListener = (pictureElement, photoObject) => {
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photoObject);
  });
};

const fillPictureElementData = (pictureElement, photoObject) => {
  const { url, description, comments, likes } = photoObject;
  const imgElement = pictureElement.querySelector('.picture__img');
  const commentsSpanElement = pictureElement.querySelector('.picture__comments');
  const likesSpanElement = pictureElement.querySelector('.picture__likes');
  imgElement.src = url;
  imgElement.alt = description;
  commentsSpanElement.textContent = comments.length;
  likesSpanElement.textContent = likes;
};

const createPictureElement = (photoObject) => {
  const pictureElement = pictureTemplateElement.cloneNode(true);
  fillPictureElementData(pictureElement, photoObject);
  addClickOnPhotoListener(pictureElement, photoObject);
  return pictureElement;
};

const renderPhotos = (photoObjects) => {
  const fragment = document.createDocumentFragment();
  for (const photoObject of photoObjects) {
    fragment.appendChild(createPictureElement(photoObject));
  }
  picturesContainerElement.appendChild(fragment);
};

const removePhotos = () => {
  const pictureElements = picturesContainerElement.querySelectorAll('.picture');
  if (pictureElements) {
    pictureElements.forEach((pictureElement) => pictureElement.remove());
  }
};

export { renderPhotos, removePhotos };
