import { checkStringLength, isEscapeKeyPressed } from './util.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_COUNT_LIMIT = 5;
const COMMENT_MAX_LENGTH = 140;

const hashtagValidPattern = /^[a-zа-яё0-9]+$/;

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__item--invalid',
  successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error',
});

let errorMessage = '';

const getErrorMessage = () => errorMessage;

const clearErrorMessage = () => {
  errorMessage = '';
};

const getNormalizedHashtagsList = (hashtagsString) =>
  hashtagsString
    .trim()
    .split(/\s+/)
    .map((tag) => tag.toLowerCase());

const validateHashtagsCount = (hashtags) => hashtags.length <= HASHTAG_COUNT_LIMIT;

const validateHashtagsUnique = (normalizedHashtags) => {
  const uniqueHashtags = new Set(normalizedHashtags);
  return uniqueHashtags.size === normalizedHashtags.length;
};

const Rules = [
  {
    check: (hashtags) => hashtags.some((hashtag) => hashtag === '#'),
    error: 'Хэш-тег не может состоять только из одной решётки',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => !hashtag.startsWith('#')),
    error: 'Хэш-теги должны начинаться с символа #',
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => !checkStringLength(hashtag, HASHTAG_MAX_LENGTH)),
    error: `Длина хэш-тэга не должна превышать ${HASHTAG_MAX_LENGTH} символов`,
  },
  {
    check: (hashtags) => hashtags.some((hashtag) => !hashtagValidPattern.test(hashtag.slice(1))),
    error: 'Хэш-тэг может содержать только буквы и цифры',
  },
  {
    check: (hashtags) => !validateHashtagsUnique(hashtags),
    error: 'Хэш-тэги должны быть уникальными',
  },
];

const validateHashtags = (hashtagsString) => {
  clearErrorMessage();
  if (!hashtagsString) {
    return true;
  }
  const normalizedHashtags = getNormalizedHashtagsList(hashtagsString);
  if (!validateHashtagsCount(normalizedHashtags)) {
    errorMessage = `Нельзя использовать более ${HASHTAG_COUNT_LIMIT} хэш-тэгов`;
    return false;
  }

  return !Rules.some((rule) => {
    const isInvalid = rule.check(normalizedHashtags);
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return isInvalid;
  });
};

const validateComments = (commentString) => {
  clearErrorMessage();
  const isValid = checkStringLength(commentString.trim(), COMMENT_MAX_LENGTH);
  if (!isValid) {
    errorMessage = `Максимальная длина комментария - ${COMMENT_MAX_LENGTH} символов`;
  }
  return isValid;
};

pristine.addValidator(hashtagsInputElement, validateHashtags, getErrorMessage);

pristine.addValidator(commentInputElement, validateComments, getErrorMessage);

const onInput = () => {
  submitButtonElement.disabled = !pristine.validate();
};

hashtagsInputElement.addEventListener('input', onInput);
commentInputElement.addEventListener('input', onInput);

hashtagsInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

commentInputElement.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

const resetPristine = () => pristine.reset();

export { resetPristine };
