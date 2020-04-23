import {EXTRA_FILM_LIST_TITLES} from "../const.js";
import AbstractComponent from "./abstract-component";

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

export default class ExtraFilmList extends AbstractComponent {
  getTemplate() {
    return createExtraFilmListTemplate();
  }
}
