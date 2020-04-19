import {createElement} from "../utils";

const createSortFilmMarkup = (title, isActive) => {
  return (
    `<li><a href="#" class="sort__button ${isActive ? `sort__button--active` : ``}">${title}</a></li>`
  );
};


const createSortFilmsTemplate = (titles) => {
  const sortFilmMarkup = titles.map((it, i) => createSortFilmMarkup(it, i === 0)).join(`\n`);
  return (
    `<ul class="sort">
      ${sortFilmMarkup}
     </ul>`
  );
};

export default class SortFilms {
  constructor(titles) {
    this._titles = titles;
    this._element = null;
  }

  getTemplate() {
    return createSortFilmsTemplate(this._titles);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
