import {EXTRA_FILM_LIST_TITLES} from "../const.js";
import {createElement} from "../utils";

const extraFilmListMarkup = () => {
  return EXTRA_FILM_LIST_TITLES.map((title) => {
    return (
      `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container"></div>
     </section>`
    );
  }).join(`\n`);
};

const createExtraFilmListTemplate = () => {
  return (
    `${extraFilmListMarkup()}`
  );
};

export default class ExtraFilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmListTemplate();
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
