import AbstractComponent from "./abstract-component";

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

export default class SortFilms extends AbstractComponent {
  constructor(titles) {
    super();
    this._titles = titles;
  }

  getTemplate() {
    return createSortFilmsTemplate(this._titles);
  }
}
