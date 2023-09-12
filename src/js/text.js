import getTime from './time';
import GeoPopup from './geoPopup';

export default class Text {
  constructor() {
    this.input = null;
    this.container = null;
    this.form = null;
    this.popup = null;
  }

  init() {
    this.input = document.querySelector('.control__text');
    this.container = document.querySelector('.timeline__content');
    this.form = document.querySelector('.form__input');
    this.popup = document.querySelector('.timeline__geoPopup');

    this.geoPopup = new GeoPopup(this.popup, {
      validInputCoord: this.validInputCoord.bind(this),
    });
    this.geoPopup.init();

    this.initListener();
  }

  initListener() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.geoPermission();
    });
  }

  createCard() {
    const textEl = document.createElement('div');
    textEl.classList.add('text__element');

    const textElText = document.createElement('div');
    textElText.classList.add('text__element_content');
    textElText.textContent = this.input.value;

    const date = Date();
    const textELDate = document.createElement('div');
    textELDate.classList.add('text__element_date');
    textELDate.textContent = getTime(date);

    const latitudeText = this.latitude >= 0 ? 'N: ' : 'S: ';
    const longitudeText = this.longitude >= 0 ? 'E: ' : 'W: ';
    const textELCoords = document.createElement('div');
    textELCoords.classList.add('text__coords');
    textELCoords.innerHTML = `
          <div class="text__coords_lat">
              <span>${latitudeText}</span>
              <span>${Math.abs(this.latitude)}</span>
          </div>
          <div class="text__coords_lon">
              <span>${longitudeText}</span>
              <span>${Math.abs(this.longitude)}</span>
          </div>`;

    textEl.appendChild(textElText);
    textEl.appendChild(textELDate);
    textEl.appendChild(textELCoords);

    this.input.value = '';
    this.container.append(textEl);
  }

  showPopup() {
    this.popup.classList.remove('hidden');
    this.popup.classList.add('active');
  }

  validInputCoord(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.createCard();
    this.hidePopup();
  }

  hidePopup() {
    this.popup.classList.remove('active');
    this.popup.classList.add('hidden');
  }

  reset() {
    this.form.reset();
    this.latitude = null;
    this.longitude = null;
  }

  positionDetected(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.createCard();
  }

  positionError() {
    this.showPopup();
  }

  geoPermission() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.positionDetected.bind(this),
        this.positionError.bind(this),
      );
    } else {
      this.positionError();
    }
  }
}
