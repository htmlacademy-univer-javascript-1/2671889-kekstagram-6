const Effects = {
  none: {
    filter: '',
    unit: '',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
  },
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelElement = document.querySelector('.effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

let currentEffect = 'none';

const createEffectSlider = () => {
  noUiSlider.create(effectLevelSliderElement, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => (Number.isInteger(value) ? value : value.toFixed(1)),
      from: (value) => parseFloat(value),
    },
  });
  effectsListElement.addEventListener('change', onEffectChange);
  effectLevelSliderElement.noUiSlider.on('update', onEffectSliderUpdate);
};

const updateEffectSlider = (effect) => {
  const effectConfig = Effects[effect];

  effectLevelSliderElement.noUiSlider.updateOptions(effectConfig.options);
  effectLevelSliderElement.noUiSlider.set(effectConfig.options.start);
};

const showEffectSlider = () => {
  effectLevelElement.classList.remove('hidden');
};

const hideEffectSlider = () => {
  effectLevelElement.classList.add('hidden');
};

const updateEffect = (effect, value) => {
  const effectConfig = Effects[effect];

  if (effect === 'none') {
    imagePreviewElement.style.filter = '';
    hideEffectSlider();
  } else {
    imagePreviewElement.style.filter = `${effectConfig.filter}(${value}${effectConfig.unit})`;
    showEffectSlider();
  }

  effectLevelValueElement.setAttribute('value', value);
  effectLevelValueElement.value = value;
};

const resetEffectSlider = () => {
  currentEffect = 'none';
  updateEffect(currentEffect, Effects.none.options.start);
  hideEffectSlider();
};

function onEffectSliderUpdate() {
  const value = effectLevelSliderElement.noUiSlider.get();
  updateEffect(currentEffect, value);
}

function onEffectChange(evt) {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    updateEffectSlider(currentEffect);
    updateEffect(currentEffect, Effects[currentEffect].options.start);
  }
}

createEffectSlider();

export { resetEffectSlider };
