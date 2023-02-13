import '../nouislider/nouislider.js';

const scaleInput = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 0,
    step: 1,
    unit: ' ',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ' ',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ' ',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

noUiSlider.create(slider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

const updateSlider = (chosenEffect) => {
  slider.classList.remove('hidden');
  slider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDefault()) {
    slider.classList.add('hidden');
  }
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider(chosenEffect);
};

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const onSliderUpdate = () => {
  image.style.filter = 'none';
  image.className = '';
  const effectValue = slider.noUiSlider.get();
  image.classList.add(`effects__preview--${chosenEffect.name}`);
  image.style.filter = `${chosenEffect.style}(${effectValue}${chosenEffect.unit})`;
};

slider.noUiSlider.on('update', onSliderUpdate);
form.addEventListener('change', onFormChange);

//Масштаб
const scaleImage = (value = DEFAULT_SCALE) => {
  image.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue - SCALE_STEP;
  if (newValue >= MIN_SCALE) {
    scaleImage(newValue);
  } else {
    smallerButton.setAttribute('disabled');
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = currentValue + SCALE_STEP;
  if (newValue <= DEFAULT_SCALE) {
    scaleImage(newValue);
  } else {
    biggerButton.setAttribute('disabled');
  }
};

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

export { resetScale };
