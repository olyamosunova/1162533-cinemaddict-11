import AbstractComponent from "./abstract-component";

export const FilterType = {
  DEFAULT: `#All movies`,
  WATCHLIST: `#Watchlist`,
  HISTORY: `#History`,
  FAVORITES: `#Favorites`,
};

const createFilterMarkup = (filter, isActive) => {
  const {title, count} = filter;
  return (
    `<a href="#${title}"
    class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${title}
    ${count ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
    this._currentFilterType = FilterType.DEFAULT;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.href;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      handler(this._currentFilterType);
    });
  }
}
