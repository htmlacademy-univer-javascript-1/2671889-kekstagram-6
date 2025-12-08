import { isEscapeKeyPressed, toggleClass } from './util.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInput = uploadFormElement.querySelector('#upload-file');
const uploadOverlay = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCancel = uploadOverlay.querySelector('#upload-cancel');

const toggleModal = () => {
  toggleClass(uploadOverlay, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const openForm = () => {
  toggleModal();
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPressEscape);
  uploadFormCancel.addEventListener('click', onClickUploadFormCancel);
};

const closeForm = () => {
  toggleModal();
  uploadFormElement.reset();
  document.removeEventListener('keydown', onPressEscape);
  uploadFormCancel.removeEventListener('click', onClickUploadFormCancel);
};

const onFileInputChange = () => {
  if (uploadInput.files && uploadInput.files.length > 0) {
    openForm();
  }
};

const initializeForm = () => {
  uploadInput.addEventListener('change', onFileInputChange);
};

function onClickUploadFormCancel(evt) {
  evt.preventDefault();
  closeForm();
}

function onPressEscape(evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

export { initializeForm, closeForm, uploadFormElement };
