'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map = undefined;
// let mapEvent = undefined;
// const clearFields = () =>
//   (inputDistance.value =
//     inputCadence.value =
//     inputDuration.value =
//     inputElevation.value =
//       '');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description =
      `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
        months[this.date.getMonth()]
      } ${this.date.getDate()}` || 'error displaying description';
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance; // min/km
    return this.pace;
  }
}
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // km/h
    return this.speed;
  }
}

class App {
  #map = undefined;
  #mapEvent = undefined;
  #mapZoomLevel = 13;
  #activity = [];

  constructor() {
    this._getPosition();
    this._getLocalStorage();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener(
      'click',
      this._moveToPosition.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
      }, this._loadMap.bind(this));
  }
  _moveToPosition(e) {
    const activityEl = e.target.closest('.workout');
    if (!activityEl) return;

    const activity = this.#activity.find(a => a.id === activityEl.dataset.id);

    this.#map.setView(activity.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    // console.log(activity);
    // activity.click();
  }
  _setLocalStorage() {
    localStorage.setItem('exercise', JSON.stringify(this.#activity));
  }
  _getLocalStorage() {
    const records = JSON.parse(localStorage.getItem('exercise'));
    if (!records) return;
    this.#activity = records;
    this.#activity.forEach(a => this._renderExercise(a));
  }
  _loadMap() {
    //   alert('Unable to find you:(');
    const coords = [37.787468, -122.459336];
    console.log(coords);

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#activity.forEach(a => this._renderMarker(a));
  }
  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm() {
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    // utility functions
    const positiveNumbers = (...entries) => entries.every(e => e > 0);
    const validEntries = (...entries) => entries.every(e => Number.isFinite(e));

    // prevent default form behavior
    e.preventDefault();

    // data from the form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let exercise = undefined;

    // when running
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // validate data
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validEntries(distance, duration, cadence) ||
        !positiveNumbers(distance, duration, cadence)
      )
        return alert('Provide a positive number');

      exercise = new Running([lat, lng], distance, duration, cadence);
    }

    // when cycling
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validEntries(distance, duration, elevation) ||
        !positiveNumbers(distance, duration)
      )
        return alert('Provide a valid number');

      exercise = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add activity
    this.#activity.push(exercise);

    //render exercise on the map
    this._renderMarker(exercise);

    // render exercise on side list
    this._renderExercise(exercise);

    // reset form
    this._hideForm();

    //
    this._setLocalStorage();
  }

  _renderMarker(exercise) {
    const popOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${exercise.type}-popup`,
    };

    L.marker(exercise.coords)
      .addTo(this.#map)
      .bindPopup(L.popup(popOptions))
      .setPopupContent(
        `${exercise.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${exercise.description}`
      )
      .openPopup();
  }

  _renderExercise(exercise) {
    let html = `
        <li class="workout workout--${exercise.type}" data-id="${exercise.id}">
          <h2 class="workout__title">${exercise.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              exercise.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${exercise.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${exercise.duration}</span>
            <span class="workout__unit">min</span>
          </div>
      
    `;

    if (exercise.type === 'running')
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${exercise.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${exercise.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
          `;

    if (exercise.type === 'cycling')
      html += `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${exercise.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${exercise.elevation}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
          `;

    form.insertAdjacentHTML('afterend', html);
  }

  hardReset() {
    localStorage.removeItem('exercise');
    location.reload();
  }
}

new App();
