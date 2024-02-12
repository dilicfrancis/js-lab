import View from './view';
import preview from './preView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errMessage = 'No Recipe Found';
  _successMessage = '';

  _generateMarkup() {
    return this._recipe.map(result => preview.render(result, false)).join('');
  }
}

export default new ResultsView();
