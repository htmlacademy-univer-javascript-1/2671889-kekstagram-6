const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isEscapeKeyPressed = (evt) => evt.key === 'Escape';

const isButton = (evt) => evt.target.tagName === 'BUTTON';

const toggleClass = (element, className) => {
  if (element) {
    element.classList.toggle(className);
  }
};

const checkStringLength = (string, length) => string.length <= length;

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  shuffleArray,
  isEscapeKeyPressed,
  isButton,
  toggleClass,
  checkStringLength,
  debounce,
};
