import {
  API_KEY,
  API_URL,
  DEFAULT_PAGE_NUMBER,
  ITEMS_PER_PAGE,
} from './config';
import { apiRequest } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: ITEMS_PER_PAGE,
    currentPage: DEFAULT_PAGE_NUMBER,
  },
  bookmarks: [],
};

const format = resJSON => {
  const { recipe } = resJSON.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const getRecipe = async id => {
  try {
    const resJSON = await apiRequest(`${API_URL}${id}?key=${API_KEY}`);

    state.recipe = format(resJSON);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

    // console.log(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getResults = async query => {
  try {
    state.search.query = query;
    const resJSON = await apiRequest(
      `${API_URL}?search=${query}&key=${API_KEY}`
    );
    // if (resJSON.data.recipe.length === 0) throw new Error(err);
    state.search.results = resJSON.data.recipes.map(i => {
      return {
        id: i.id,
        title: i.title,
        publisher: i.publisher,
        image: i.image_url,
        ...(i.key && { key: i.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const submitRecipe = async entry => {
  try {
    const ingredients = Object.entries(entry)
      .filter(e => e[0].startsWith('ingredient') && e[1] !== '')
      .map(i => {
        // const arr = i[1].replaceAll(' ', '').split(',');
        const arr = i[1].split(',').map(e => e.trim());

        if (arr.length !== 3)
          throw new Error(
            "Provide ingredients in this format: 'Quantity, Unit, Description'"
          );

        const [quantity, unit, description] = arr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: entry.title,
      source_url: entry.sourceUrl,
      image_url: entry.image,
      publisher: entry.publisher,
      cooking_time: +entry.cookingTime,
      servings: +entry.servings,
      ingredients,
    };

    const response = await apiRequest(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = format(response);
    setBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const getPage = (page = state.search.currentPage) => {
  state.search.currentPage = page;

  const start = (page - 1) * state.search.page; // 0
  const end = page * state.search.page; // 9

  return state.search.results.slice(start, end);
};

export const changeServings = serving => {
  state.recipe.ingredients.forEach(i => {
    i.quantity = (i.quantity * serving) / state.recipe.servings;
  });
  state.recipe.servings = serving;
};

const storeBookmarks = () =>
  localStorage.setItem('recipes', JSON.stringify(state.bookmarks));

export const setBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  storeBookmarks();
};

export const unsetBookmark = id => {
  const index = state.bookmarks.findIndex(e => e.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  storeBookmarks();
};

(function () {
  const bookmarks = localStorage.getItem('recipes');
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
})();

// (function () {
//   localStorage.clear('recipes');
// })();
