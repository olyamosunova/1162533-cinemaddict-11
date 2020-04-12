import {EXTRA_FILM_LIST_TITLES} from "../const.js";

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

export const createExtraFilmListTemplate = () => {
  return (
    `${extraFilmListMarkup()}`
  );
};
