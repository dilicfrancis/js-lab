import View from './view';
import preview from './preView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = 'No Bookmarks Yet';
  _successMessage = '';

  _generateMarkup() {
    return this._recipe
      .map(bookmark => preview.render(bookmark, false))
      .join('');
  }

  eventRenderHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
