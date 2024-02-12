import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const totalPages = Math.ceil(
      this._recipe.results.length / this._recipe.page
    );

    //First Page with more
    if (this._recipe.currentPage === 1 && totalPages > 1)
      return `
        <button class="btn--inline pagination__btn--next" data-nav="${
          this._recipe.currentPage + 1
        }">
            <span>Page ${this._recipe.currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
         </button>
      `;

    //last Page
    if (this._recipe.currentPage === totalPages && totalPages > 1)
      return `
        <button class="btn--inline pagination__btn--prev" data-nav="${
          this._recipe.currentPage - 1
        }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._recipe.currentPage - 1}</span>
        </button>
      `;

    // Middle Page
    if (this._recipe.currentPage < totalPages)
      return `
        <button class="btn--inline pagination__btn--prev" data-nav="${
          this._recipe.currentPage - 1
        }">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._recipe.currentPage - 1}</span>
        </button>
        <button class="btn--inline pagination__btn--next" data-nav="${
          this._recipe.currentPage + 1
        }">
            <span>Page ${this._recipe.currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    //Lone Page
    return '';
  }

  eventClickHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--inline');
      if (!button) return;

      const page = +button.dataset.nav;

      handler(page);
    });
  }
}

export default new PaginationView();
