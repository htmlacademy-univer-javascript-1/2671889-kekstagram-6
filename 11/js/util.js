const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (array) =>
  array[getRandomInt(0, array.length - 1)];

const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

const checkStringLength = (string, length) => string.length <= length;

export {
  getRandomInt,
  getRandomArrayElement,
  isEscapeKeyPressed,
  toggleClass,
  checkStringLength,
};
