const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleControlElement = document.querySelector('.scale__control--value');
const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

const setScale = (value) => {
  currentScale = value;
  scaleControlElement.value = `${value}%`;
  scaleControlElement.setAttribute('value', `${value}%`);
  imagePreviewElement.style.transform = `scale(${value / 100})`;
};

const resetScale = () => setScale(SCALE_DEFAULT);

const onScaleSmallerClick = () => {
  const newValue = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  setScale(newValue);
};

const onScaleBiggerClick = () => {
  const newValue = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  setScale(newValue);
};

scaleSmallerElement.addEventListener('click', onScaleSmallerClick);
scaleBiggerElement.addEventListener('click', onScaleBiggerClick);

export { resetScale };
