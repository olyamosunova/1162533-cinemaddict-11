import AbstractSmartComponent from "./abstract-smart-component";

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

export default class SortFilms extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
    this._sortTypeChangeHandler = null;
  }

  getTemplate() {
    return createSortFilmsTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  recoveryListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._currentSortType = SortType.DEFAULT;
    this.rerender();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const sortClass = evt.target.getAttribute(`class`);
      const sortingControlElements = this.getElement().querySelectorAll(`.${sortClass}`);

      sortingControlElements.forEach((item) => item.classList.remove(`sort__button--active`));

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      evt.target.classList.add(`${sortClass}--active`);

      handler(this._currentSortType);
    });

    this._sortTypeChangeHandler = handler;
  }
}
