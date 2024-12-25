import '../vendor/nouislider/nouislider.js';

const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const Effects = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectSettings = {
  [Effects.CHROME]: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: ''
  },
  [Effects.SEPIA]: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    unit: ''
  },
  [Effects.MARVIN]: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    unit: '%'
  },
  [Effects.PHOBOS]: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    unit: 'px'
  },
  [Effects.HEAT]: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    unit: ''
  }
};

const uploadForm = document.querySelector('.img-upload__form');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectLevel = uploadForm.querySelector('.effect-level__value');
const effectSlider = uploadForm.querySelector('.effect-level__slider');
const effectsList = uploadForm.querySelector('.effects__list');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const scaleDown = uploadForm.querySelector('.scale__control--smaller');
const scaleUp = uploadForm.querySelector('.scale__control--bigger');

let currentEffect = Effects.DEFAULT;

const isDefault = () => currentEffect === Effects.DEFAULT;

const hideSlider = () => {
  uploadForm.querySelector('.img-upload__effect-level').classList.add('hidden');
};

const showSlider = () => {
  uploadForm.querySelector('.img-upload__effect-level').classList.remove('hidden');
};

const onSliderUpdate = () => {
  const value = effectSlider.noUiSlider.get();
  effectLevel.value = Number(value).toString();
  const { filter, unit } = EffectSettings[currentEffect];
  previewImage.style.filter = isDefault()
    ? ''
    : `${filter}(${value}${unit})`;
};

const updateSlider = () => {
  if (isDefault()) {
    hideSlider();
    return;
  }

  showSlider();
  const settings = EffectSettings[currentEffect];
  noUiSlider.create(effectSlider, {
    range: settings.range,
    step: settings.step,
    start: settings.range.max,
    connect: 'lower'
  });

  effectSlider.noUiSlider.on('update', onSliderUpdate);
  onSliderUpdate();
};

const destroySlider = () => {
  if (effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
};

const onEffectChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }
  destroySlider();
  effectLevel.value = '';
  currentEffect = evt.target.value;
  previewImage.className = `effects__preview--${currentEffect}`;

  if (isDefault()) {
    previewImage.style.filter = '';
    hideSlider();
  } else {
    updateSlider();
  }
};

const initEffects = () => {
  hideSlider();
  effectsList.addEventListener('change', onEffectChange);
};

// Scale
const setScale = (value) => {
  const scale = value / 100;
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${scale})`;
};

const onScaleButtonClick = (evt) => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = evt.target === scaleDown
    ? Math.max(currentValue - Scale.STEP, Scale.MIN)
    : Math.min(currentValue + Scale.STEP, Scale.MAX);
  setScale(newValue);
};

const initScale = () => {
  setScale(Scale.DEFAULT);
  scaleDown.addEventListener('click', onScaleButtonClick);
  scaleUp.addEventListener('click', onScaleButtonClick);
};

const resetEffects = () => {
  currentEffect = Effects.DEFAULT;
  destroySlider();
  setScale(Scale.DEFAULT);
  previewImage.className = '';
  previewImage.style.filter = '';
};

export { initEffects, initScale, resetEffects };
