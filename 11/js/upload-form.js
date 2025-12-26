import { isEscapeKeyPressed, toggleClass } from './util.js';
import { resetEffectSlider } from './image-preview-effects.js';
import { resetScale } from './image-preview-scale.js';
import { resetPristine } from './upload-form-validation.js';
import { uploadData } from './fetch-data.js';
import { showSuccessMessage, showErrorMessage } from './upload-form-messages.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('#upload-file');
const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const uploadFormCancelElement = uploadOverlayElement.querySelector('#upload-cancel');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const toggleModal = () => {
  toggleClass(uploadOverlayElement, 'hidden');
  toggleClass(document.body, 'modal-open');
};

const openForm = () => {
  toggleModal();
  document.addEventListener('keydown', onPressEscape);
  uploadFormCancelElement.addEventListener('click', onClickUploadFormCancel);
};

const closeForm = () => {
  toggleModal();
  uploadFormElement.reset();
  document.removeEventListener('keydown', onPressEscape);
  uploadFormCancelElement.removeEventListener('click', onClickUploadFormCancel);
  resetScale();
  resetEffectSlider();
  resetPristine();
  submitButtonElement.disabled = false;
};

const onFileInputChange = () => {
  if (uploadInputElement.files && uploadInputElement.files.length > 0) {
    openForm();
  }
};

const initializeForm = () => {
  uploadInputElement.addEventListener('change', onFileInputChange);
  uploadFormElement.addEventListener('submit', onSubmitForm);
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

function onSubmitForm(evt) {
  evt.preventDefault();
  submitButtonElement.disabled = true;
  const formData = new FormData(evt.target);
  uploadData(formData)
    .then(() => {
      closeForm();
      showSuccessMessage();
    })
    .catch(() => {
      showErrorMessage();
    })
    .finally(() => {
      submitButtonElement.disabled = false;
    });
}

export { initializeForm };
