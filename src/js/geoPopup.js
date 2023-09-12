import Validator from './validator';

export default class GeoPopup {
  constructor(parentEl, formCallbacks) {
    this.parentEl = parentEl;
    this.formCallbacks = formCallbacks;
  }

  init() {
    this.form = document.querySelector('.geoPopup__form');
    this.errorMessage = document.querySelector('.geoPopup__error');
    this.input = document.querySelector('.geoPopup__input');
    this.popup = document.querySelector('.timeline__geoPopup');
    this.cancelButton = document.querySelector('.geoPopup__cancelButton');
    this.initListeners();
  }

  initListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });

    this.input.addEventListener('input', (e) => {
      e.preventDefault();
      this.hideErrorMessage();
    });

    this.cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.closePopup();
    });
  }

  onSubmit() {
    const parseInput = Validator.parseInput(this.input.value);
    const checkedInput = Validator.parseCheck(parseInput);
    if (checkedInput.result) {
      this.formCallbacks.validInputCoord(checkedInput.latitude, checkedInput.longitude);
      this.form.reset();
    } else {
      this.showErrorMessage(checkedInput.err);
    }
  }

  closePopup() {
    this.popup.classList.remove('active');
    this.popup.classList.add('hidden');
  }

  showErrorMessage(message) {
    this.errorMessage.innerText = message;
    this.errorMessage.style.height = `${this.errorMessage.scrollHeight}px`;
    this.errorMessage.style.marginBottom = '10px';
  }

  hideErrorMessage() {
    this.errorMessage.style.height = 0;
    this.errorMessage.style.marginBottom = 0;
  }
}
