import { isEscapeKeyPressed } from './util.js';

const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.body;

const getSuccessButton = (messageSuccessElement) => messageSuccessElement.querySelector('.success__button');
const getErrorButton = (messageErrorElement) => messageErrorElement.querySelector('.error__button');

let currentShownMessageElement = null;

const addKeydownListener = () => {
  document.addEventListener('keydown', onPressEscape, { capture: true });
};

const removeKeydownListener = () => {
  document.removeEventListener('keydown', onPressEscape, { capture: true });
};

const addBodyListener = () => {
  bodyElement.addEventListener('click', onBodyClick);
};

const removeBodyListener = () => {
  bodyElement.removeEventListener('click', onBodyClick);
};

const hideMessage = () => {
  if (!currentShownMessageElement) {
    return;
  }
  removeKeydownListener();
  removeBodyListener();
  currentShownMessageElement.remove();
  currentShownMessageElement = null;
};

const addButtonClickListener = (buttonElement) => {
  buttonElement.addEventListener('click', hideMessage, { once: true });
};

const showSuccessMessage = () => {
  const messageSuccessElement = successTemplateElement.cloneNode(true);
  bodyElement.appendChild(messageSuccessElement);
  addKeydownListener();
  addBodyListener();
  addButtonClickListener(getSuccessButton(messageSuccessElement));
  currentShownMessageElement = messageSuccessElement;
};

const showErrorMessage = () => {
  const messageErrorElement = errorTemplateElement.cloneNode(true);
  bodyElement.appendChild(messageErrorElement);
  addKeydownListener();
  addBodyListener();
  addButtonClickListener(getErrorButton(messageErrorElement));
  currentShownMessageElement = messageErrorElement;
};

function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  evt.preventDefault();
  hideMessage();
}

function onPressEscape(evt) {
  if (isEscapeKeyPressed(evt)) {
    evt.preventDefault();
    hideMessage();
    evt.stopPropagation();
  }
}

export { showSuccessMessage, showErrorMessage };
