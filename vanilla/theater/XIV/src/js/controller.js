import 'core-js';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import { DEFAULT_PAGE_NUMBER, MODAL_TIMEOUT_SECS } from './config.js';
import bookmarksView from './views/bookmarksView.js';
import formView from './views/formView.js';

// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2
// API key: 01c6f52f-d73a-47fd-a34a-3f00804fc727
///////////////////////////////////////

const recipeController = async () => {
  try {
    //loading
    recipeView.spinner();

    //get id
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.refresh(model.getPage());
    bookmarksView.refresh(model.state.bookmarks);

    //get recipe
    await model.getRecipe(id);

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErr();
  }
};

const searchController = async () => {
  try {
    resultsView.spinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.getResults(query);

    // resultsView.render(model.state.search.results);
    resultsView.render(model.getPage(DEFAULT_PAGE_NUMBER));

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    // resultsView.renderErr();
  }
};

const paginationController = page => {
  resultsView.render(model.getPage(page));
  paginationView.render(model.state.search);
};

const servingsController = servings => {
  model.changeServings(servings);
  recipeView.refresh(model.state.recipe);
};

const bookmarkController = () => {
  if (!model.state.recipe.bookmarked) model.setBookmark(model.state.recipe);
  else model.unsetBookmark(model.state.recipe.id);

  recipeView.refresh(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const localStorageController = () => {
  bookmarksView.render(model.state.bookmarks);
};

const formController = async recipe => {
  try {
    formView.spinner();

    await model.submitRecipe(recipe);

    recipeView.render(model.state.recipe);

    formView.renderSuccess();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(() => {
      formView.toggle();
    }, MODAL_TIMEOUT_SECS * 1000);
  } catch (err) {
    console.error(err);
    formView.renderErr(err.message);
  }
};

const init = () => {
  bookmarksView.eventRenderHandler(localStorageController);
  recipeView.eventRenderHandler(recipeController);
  recipeView.eventServingsHandler(servingsController);
  recipeView.eventBookmarkHandler(bookmarkController);
  searchView.eventSearchHandler(searchController);
  paginationView.eventClickHandler(paginationController);
  formView.eventSubmitHandler(formController);
};
init();
