import icons from 'url:../../img/icons.svg';

export default class View {
  _recipe = {};

  #clear() {
    this._parentElement.innerHTML = '';
  }

  render(recipe, render = true) {
    if (!recipe || (Array.isArray(recipe) && recipe.length === 0))
      return this.renderErr();

    this._recipe = recipe;

    const markup = this._generateMarkup();

    if (!render) return markup;

    this.#clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  refresh(recipe) {
    // if (!recipe || (Array.isArray(recipe) && recipe.length === 0))
    //   return this.renderErr();

    this._recipe = recipe;
    const markup = this._generateMarkup();

    const virtualDOM = document.createRange().createContextualFragment(markup);
    const virtualElements = Array.from(virtualDOM.querySelectorAll('*'));
    const renderedElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    virtualElements.forEach((vEl, i) => {
      const renderedEl = renderedElements[i];

      //refresh text
      if (
        !vEl.isEqualNode(renderedEl) &&
        vEl.firstChild?.nodeValue.trim() !== ''
      )
        renderedEl.textContent = vEl.textContent;

      // refresh attributes
      if (!vEl.isEqualNode(renderedEl))
        Array.from(vEl.attributes).forEach(attr =>
          renderedEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  spinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
             </svg>
          </div>
        `;

    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErr(err = this._errMessage) {
    const markup = `
          <div class="error">
              <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
              </div>
                <p>${err}</p>
            </div>
        `;
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccess(message = this._successMessage) {
    const markup = `
          <div class="message">
              <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
              </div>
                <p>${message}</p>
            </div>
        `;
    this.#clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
