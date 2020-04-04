import {createProfileTemplate} from "./components/profile.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilmCardTemplate} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/show-more-button.js";
import {createFilmCardTopRatedTemplate} from "./components/film-card-top-rated.js";
import {createFilmCardMostCommentedTemplate} from "./components/film-card-most-commented.js";
// import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFilmsContainerTemplate} from "./components/films-container.js";
import {createFilmsListTopRatedTemplate} from "./components/films-list-top-rated.js";
import {createFilmsListMostCommentedTemplate} from "./components/films-list-most-commented.js";
import {createSortFilmsTemplate} from "./components/sort-films.js";
import {createFilmsCountTemplate} from "./components/films-count.js";

const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, createProfileTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, createMenuTemplate(), `beforeend`);
render(siteMainElement, createSortFilmsTemplate(), `beforeend`);
render(siteMainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(), `beforeend`);
}

render(filmsListElement, createShowMoreButtonTemplate(), `beforeend`);
render(filmsElement, createFilmsListTopRatedTemplate(), `beforeend`);
render(filmsElement, createFilmsListMostCommentedTemplate(), `beforeend`);

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

render(footerStatisticsElement, createFilmsCountTemplate(), `beforeend`);
