import '../vendor/nouislider/nouislider.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectSetting = {
  [Effect.CHROME]: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: ''
  },
  [Effect.SEPIA]: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: ''
  },
  [Effect.MARVIN]: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit: '%'
  },
  [Effect.PHOBOS]: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    unit: 'px'
  },
  [Effect.HEAT]: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    unit: ''
  }
};

const uploadFormElement = document.querySelector('.img-upload__form');
const previewImageElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectLevelElement = uploadFormElement.querySelector('.effect-level__value');
const effectSliderElement = uploadFormElement.querySelector('.effect-level__slider');
const effectsListElement = uploadFormElement.querySelector('.effects__list');
const scaleInputElement = uploadFormElement.querySelector('.scale__control--value');
const scaleDownElement = uploadFormElement.querySelector('.scale__control--smaller');
const scaleUpElement = uploadFormElement.querySelector('.scale__control--bigger');

let currentEffect = Effect.DEFAULT;

const isDefault = () => currentEffect === Effect.DEFAULT;

const hideSlider = () => {
  uploadFormElement.querySelector('.img-upload__effect-level').classList.add('hidden');
};

const showSlider = () => {
  uploadFormElement.querySelector('.img-upload__effect-level').classList.remove('hidden');
};

const onSliderUpdate = () => {
  const value = effectSliderElement.noUiSlider.get();
  effectLevelElement.value = Number(value).toString();
  const { filter, unit } = EffectSetting[currentEffect];
  previewImageElement.style.filter = isDefault()
    ? ''
    : `${filter}(${value}${unit})`;
};

const updateSlider = () => {
  if (isDefault()) {
    hideSlider();
    return;
  }

  showSlider();
  const settings = EffectSetting[currentEffect];
  noUiSlider.create(effectSliderElement, {
    range: settings.range,
    step: settings.step,
    start: settings.range.max,
    connect: 'lower'
  });

  effectSliderElement.noUiSlider.on('update', onSliderUpdate);
  onSliderUpdate();
};

const destroySlider = () => {
  if (effectSliderElement.noUiSlider) {
    effectSliderElement.noUiSlider.destroy();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  destroySlider();
  effectLevelElement.value = '';
  currentEffect = evt.target.value;
  previewImageElement.className = `effects__preview--${currentEffect}`;

  if (isDefault()) {
    previewImageElement.style.filter = '';
    hideSlider();
  } else {
    updateSlider();
  }
};

const initEffects = () => {
  hideSlider();
  effectsListElement.addEventListener('change', onEffectChange);
};

// Scale
const setScale = (value) => {
  const scale = value / 100;
  scaleInputElement.value = `${value}%`;
  previewImageElement.style.transform = `scale(${scale})`;
};

const onScaleButtonClick = (evt) => {
  const currentValue = parseInt(scaleInputElement.value, 10);
  const newValue = evt.target === scaleDownElement
    ? Math.max(currentValue - Scale.STEP, Scale.MIN)
    : Math.min(currentValue + Scale.STEP, Scale.MAX);
  setScale(newValue);
};

const initScale = () => {
  setScale(Scale.DEFAULT);
  scaleDownElement.addEventListener('click', onScaleButtonClick);
  scaleUpElement.addEventListener('click', onScaleButtonClick);
};

const resetEffects = () => {
  currentEffect = Effect.DEFAULT;
  destroySlider();
  setScale(Scale.DEFAULT);
  previewImageElement.className = '';
  previewImageElement.style.filter = '';
};

export { initEffects, initScale, resetEffects };
