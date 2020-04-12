import {createProfileTemplate} from "./components/profile.js";
import {createFilterTemplate} from "./components/filter.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmCardTopRatedTemplate} from "./components/film-card-top-rated.js";
import {createFilmCardMostCommentedTemplate} from "./components/film-card-most-commented.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createExtraFilmListTemplate} from "./components/extra-film-list.js";
import {createSortFilmsTemplate} from "./components/sort-films.js";
import {createFilmsCountTemplate} from "./components/films-count.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {sortFilmTitles} from "./mock/sortFilm.js";
import {getUserRank} from "./mock/profile.js";
// import {generateExtraFilmCard} from "./mock/extra-films.js";
import {render} from "./utils.js";

const EXTRA_CARD_COUNT = 2;
const CARD_COUNT = 20;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;

const films = generateFilms(CARD_COUNT);
const filters = generateFilters(films);
const userRank = getUserRank(filters);

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createProfileTemplate(userRank), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createSortFilmsTemplate(sortFilmTitles), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

// films.slice(0, CARD_COUNT).forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));
// films.forEach((film) => render(siteMainElement, createFilmDetailsTemplate(film), `beforeend`));

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(filmsElement, createExtraFilmListTemplate(), `beforeend`);

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElements.forEach((item, i) => {
  const containerElement = item.querySelector(`.films-list__container`);

  if (i === 0) {
    for (let j = 0; j < EXTRA_CARD_COUNT; j++) {
      render(containerElement, createFilmCardTopRatedTemplate(), `beforeend`);
    }
  } else {
    for (let j = 0; j < EXTRA_CARD_COUNT; j++) {
      render(containerElement, createFilmCardMostCommentedTemplate(), `beforeend`);
    }
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, createFilmsCountTemplate(`130 291`), `beforeend`);

let showingTasksCount = SHOWING_CARD_COUNT_ON_START;

films.slice(0, showingTasksCount)
  .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);

showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_CARD_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingTasksCount)
    .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

  if (showingTasksCount >= films.length) {
    showMoreButton.remove();
  }
});

const bodyElement = document.querySelector(`body`);
render(bodyElement, createFilmDetailsTemplate(films[0]), `beforeend`);

const filmDetailsPopup = bodyElement.querySelector(`.film-details`);
const closePopupButton = filmDetailsPopup.querySelector(`.film-details__close-btn`);

closePopupButton.addEventListener(`click`, () => {
  filmDetailsPopup.style.display = `none`;
});

