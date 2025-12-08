import { checkStringLength, isEscapeKeyPressed } from './util.js';
import { uploadFormElement } from './upload-form.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_COUNT_LIMIT = 5;
const COMMENT_MAX_LENGTH = 140;

const hashtagValidPattern = /^[a-zA-Zа-яА-ЯёЁ0-9]+$/;

const hashtagsInput = uploadFormElement.querySelector('.text__hashtags');
const commentInput = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__text',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const getNormalizedHashtagsList = (hashtagsString) =>
  hashtagsString
    .trim()
    .split(/\s+/)
    .map((tag) => tag.toLowerCase());

const validateHashtagsCount = (hashtags) =>
  hashtags.length <= HASHTAG_COUNT_LIMIT;

const validateHashtagsUnique = (normalizedHashtags) => {
  const originalHashtags = normalizedHashtags.filter(
    (hashtag) => hashtag.length > 1,
  );
  const uniqueHashtags = new Set(originalHashtags);
  return uniqueHashtags.size === originalHashtags.length;
};

const validateComments = (value) =>
  value.trim() === '' || checkStringLength(value, COMMENT_MAX_LENGTH);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    validateHashtagsCount(getNormalizedHashtagsList(hashtagsString)),
  `Нельзя использовать более ${HASHTAG_COUNT_LIMIT} хэш-тэгов`,
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    validateHashtagsUnique(getNormalizedHashtagsList(hashtagsString)),
  'Хэш-тэги должны быть уникальными',
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    getNormalizedHashtagsList(hashtagsString).every(
      (hashtag) => hashtag !== '#',
    ),
  'Хэш-тег не может состоять только из одной решётки',
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    getNormalizedHashtagsList(hashtagsString).every(
      (hashtag) => hashtag.startsWith('#') || checkStringLength(hashtag, 0),
    ),
  'Хэш-теги должны начинаться с символа #',
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    getNormalizedHashtagsList(hashtagsString).every((hashtag) =>
      checkStringLength(hashtag, HASHTAG_MAX_LENGTH),
    ),
  `Длина хэш-тэга не должна превышать ${HASHTAG_MAX_LENGTH} символов`,
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    getNormalizedHashtagsList(hashtagsString).every((hashtag) =>
      checkStringLength(hashtag, HASHTAG_MAX_LENGTH),
    ),
  `Длина хэш-тэга не должна превышать ${HASHTAG_MAX_LENGTH} символов`,
);

pristine.addValidator(
  hashtagsInput,
  (hashtagsString) =>
    getNormalizedHashtagsList(hashtagsString).every(
      (hashtag) =>
        checkStringLength(hashtag, 1) ||
        !hashtag.startsWith('#') ||
        hashtagValidPattern.test(hashtag.slice(1)),
    ),
  'Хэш-тэг может содержать только буквы и цифры',
);

pristine.addValidator(
  commentInput,
  validateComments,
  `Максимальная длина комментария - ${COMMENT_MAX_LENGTH} символов`,
);

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKeyPressed(evt)) {
    evt.stopPropagation();
  }
});

uploadFormElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
