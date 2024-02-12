class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  #clear() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  eventSearchHandler(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
      this.#clear();
    });
  }
}

export default new SearchView();
