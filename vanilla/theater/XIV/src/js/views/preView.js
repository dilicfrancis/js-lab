import View from './view';
import icons from 'url:../../img/icons.svg';

class Preview extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
            <a class="preview__link ${
              this._recipe.id === id ? 'preview__link--active' : ''
            }" href="#${this._recipe.id}">
              <figure class="preview__fig">
                <img src="${this._recipe.image}" alt="${this._recipe.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._recipe.title}</h4>
                <p class="preview__publisher">${this._recipe.publisher}</p>
                <div class="recipe__user-generated ${
                  this._recipe.key ? '' : 'hidden'
                }">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
        </li>
    `;
  }
}

export default new Preview();
