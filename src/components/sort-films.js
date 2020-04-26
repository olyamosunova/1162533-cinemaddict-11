import AbstractComponent from "./abstract-component";

// Сортировка работает в одном направлении — от максимального к минимальному:
//  при сортировке по дате выхода в начале списка будут самые новые фильмы,
//  при сортировке по рейтингу — с самым высоким рейтингом.

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createSortFilmsTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
     </ul>`
  );
};

export default class SortFilms extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortFilmsTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
