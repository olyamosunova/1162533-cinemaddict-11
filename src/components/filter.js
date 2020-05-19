import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

const createFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<a href="#${name}"
    data-filter-name="${name}"
    class="main-navigation__item ${isChecked ? `main-navigation__item--active` : ``}">${name}
    ${name === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterMarkup}
      </div>
      <a href="#stats" data-filter-name="stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterControlElements = this.getElement().querySelectorAll(`.main-navigation__item`);

      filterControlElements.forEach((item) => item.classList.remove(`main-navigation__item--active`));

      const filterName = evt.target.dataset.filterName;

      evt.target.classList.add(`main-navigation__item--active`);

      handler(filterName);
    });
  }
}
