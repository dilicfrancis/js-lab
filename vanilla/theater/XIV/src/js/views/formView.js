import View from './view';

class FormView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Sweet!';

  _form = document.querySelector('.add-recipe-window');
  _tint = document.querySelector('.overlay');
  _openButton = document.querySelector('.nav__btn--add-recipe');
  _closeButton = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#eventRevealHandler();
    this.#eventHideHandler();
  }

  toggle() {
    this._tint.classList.toggle('hidden');
    this._form.classList.toggle('hidden');
  }

  #eventRevealHandler() {
    this._openButton.addEventListener('click', this.toggle.bind(this));
  }
  #eventHideHandler() {
    this._closeButton.addEventListener('click', this.toggle.bind(this));
    this._tint.addEventListener('click', this.toggle.bind(this));
  }

  eventSubmitHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const fields = Object.fromEntries([...new FormData(this)]);
      handler(fields);
    });
  }

  _generateMarkup() {}
}

export default new FormView();
