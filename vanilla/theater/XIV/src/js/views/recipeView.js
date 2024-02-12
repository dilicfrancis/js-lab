import fracty from 'fracty';
import icons from 'url:../../img/icons.svg';
import View from './view';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errMessage = 'We do not have that recipe';
  _successMessage = '';

  _generateMarkup() {
    return `
     <figure class="recipe__fig">
       <img src="${this._recipe.image}" alt="${
      this._recipe.title
    }" class="recipe__img" />
       <h1 class="recipe__title">
         <span>${this._recipe.title}</span>
       </h1>
     </figure>

     <div class="recipe__details">
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-clock"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--minutes">${
           this._recipe.cookingTime
         }</span>
         <span class="recipe__info-text">minutes</span>
       </div>
       <div class="recipe__info">
         <svg class="recipe__info-icon">
           <use href="${icons}#icon-users"></use>
         </svg>
         <span class="recipe__info-data recipe__info-data--people">${
           this._recipe.servings
         }</span>
         <span class="recipe__info-text">servings</span>

         <div class="recipe__info-buttons">
           <button class="btn--tiny btn--adjust-servings" data-adjust-serving="${
             this._recipe.servings - 1
           }">
             <svg>
               <use href="${icons}#icon-minus-circle"></use>
             </svg>
           </button>
           <button class="btn--tiny btn--adjust-servings" data-adjust-serving="${
             this._recipe.servings + 1
           }">
             <svg>
               <use href="${icons}#icon-plus-circle"></use>
             </svg>
           </button>
         </div>
       </div>

       <div class="recipe__user-generated ${this._recipe.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
       </div>
       <button class="btn--round btn--bookmark">
         <svg class="">
           <use href="${icons}#icon-bookmark${
      this._recipe.bookmarked === true ? '-fill' : ''
    }"></use>
         </svg>
       </button>
     </div>

     <div class="recipe__ingredients">
       <h2 class="heading--2">Recipe ingredients</h2>
       <ul class="recipe__ingredient-list">
       ${this._recipe.ingredients.map(this.#generateIngredientMarkup).join('')}
       </ul>
     </div>

     <div class="recipe__directions">
       <h2 class="heading--2">How to cook it</h2>
       <p class="recipe__directions-text">
         This recipe was carefully designed and tested by
         <span class="recipe__publisher">${
           this._recipe.publisher
         }</span>. Please check out
         directions at their website.
       </p>
       <a
         class="btn--small recipe__btn"
         href="${this._recipe.sourceUrl}"
         target="_blank"
       >
         <span>Directions</span>
         <svg class="search__icon">
           <use href="${icons}#icon-arrow-right"></use>
         </svg>
       </a>
     </div>
   `;
  }

  #generateIngredientMarkup(i) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      i.quantity ? fracty(i.quantity).toString() : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${i.unit}</span>
      ${i.description}
    </div>
  </li>
    `;
  }

  eventRenderHandler(handler) {
    // displayRecipe();
    // window.addEventListener('load', displayRecipe);
    // window.addEventListener('hashchange', displayRecipe);
    ['load', 'hashchange'].forEach(e => window.addEventListener(e, handler));
  }

  eventServingsHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--adjust-servings');
      if (!button) return;
      const { adjustServing } = button.dataset;
      if (+adjustServing > 0) handler(+adjustServing);
    });
  }

  eventBookmarkHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const button = e.target.closest('.btn--bookmark');
      if (!button) return;
      handler();
    });
  }
}

export default new RecipeView();
