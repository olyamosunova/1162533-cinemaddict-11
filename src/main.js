import ProfileComponent from "./components/profile.js";
import FilterComponent from "./components/filter.js";
import FilmCardComponent from "./components/film-card.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import FilmDetailsComponent from "./components/film-details.js";
import FilmsContainerComponent from "./components/films-container.js";
import ExtraFilmListComponent from "./components/extra-film-list.js";
import SortFilmsComponent from "./components/sort-films.js";
import FilmsCountComponent from "./components/films-count.js";
import {generateFilms} from "./mock/film.js";
import {generateFilters} from "./mock/filter.js";
import {getUserRank} from "./mock/profile.js";
import {render} from "./utils.js";
import {sortFilmTitles} from "./mock/sortFilm.js";
import {RenderPosition} from "./const.js";

const EXTRA_LIST_COUNT = 2;
const EXTRA_CARD_COUNT = 2;
const CARD_COUNT = 20;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;

const renderFilm = (filmsListElement, film) => {
  const removePopupElement = () => {
    filmDetailsComponent.getElement().remove();
    filmDetailsComponent.removeElement();
  };

  const closePopupElement = () => {
    const closePopupButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);
    closePopupButton.addEventListener(`click`, removePopupElement);
  };

  const onEscKeyDown = (evt) => {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      removePopupElement();
    }
  };

  const openPopupElement = () => {
    render(bodyElement, filmDetailsComponent.getElement(), RenderPosition.BEFOREND);
    closePopupElement();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmCardComponent = new FilmCardComponent(film);
  const posterFilmElement = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const titleFilmElement = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const commentsFilmElement = filmCardComponent.getElement().querySelector(`.film-card__comments`);

  posterFilmElement.addEventListener(`click`, () => {
    openPopupElement();
  });

  titleFilmElement.addEventListener(`click`, () => {
    openPopupElement();
  });

  commentsFilmElement.addEventListener(`click`, () => {
    openPopupElement();
  });

  render(filmsListElement, filmCardComponent.getElement(), RenderPosition.BEFOREND);
};

const renderExtraFilms = (extraFilmListComponent, extrafilm) => {
  const filmExtraCardComponent = new FilmCardComponent(extrafilm);
  const extraFilmListElement = extraFilmListComponent.getElement().querySelector(`.films-list__container`);
  render(extraFilmListElement, filmExtraCardComponent.getElement(), RenderPosition.BEFOREND);
};


const renderFilmsList = (filmsContainerComponent, films) => {
  render(siteMainElement, filmsContainerComponent.getElement(), RenderPosition.BEFOREND);

  const filmsListElement = filmsContainerComponent.getElement().querySelector(`.films-list__container`);

  let showingTasksCount = SHOWING_CARD_COUNT_ON_START;
  films.slice(0, showingTasksCount)
    .forEach((film) => {
      renderFilm(filmsListElement, film);
    });

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsContainerComponent.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREND);

  for (let i = 0; i < EXTRA_LIST_COUNT; i++) {
    const extraFilmListComponent = new ExtraFilmListComponent();

    if (i === 0) {
      render(filmsContainerComponent.getElement(), extraFilmListComponent.getElement(), RenderPosition.BEFOREND);

      topRatedFilms.forEach((film) => {
        renderExtraFilms(extraFilmListComponent, film);
      });
    }

    if (i === 1) {
      render(filmsContainerComponent.getElement(), extraFilmListComponent.getElement(), RenderPosition.BEFOREND);

      mostCommentedFilms.forEach((film) => {
        renderExtraFilms(extraFilmListComponent, film);
      });
    }
  }

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + SHOWING_CARD_COUNT_BY_BUTTON;

    films.slice(prevTasksCount, showingTasksCount)
      .forEach((film) => renderFilm(filmsListElement, film));

    if (showingTasksCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(CARD_COUNT);
const filters = generateFilters(films);
const userRank = getUserRank(filters);

const topRatedFilms = films.sort((a, b) => b.rating - a.rating).slice(0, EXTRA_CARD_COUNT);
const mostCommentedFilms = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, EXTRA_CARD_COUNT);

render(siteHeaderElement, new ProfileComponent(userRank).getElement(), RenderPosition.BEFOREND);
render(siteMainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREND);
render(siteMainElement, new SortFilmsComponent(sortFilmTitles).getElement(), RenderPosition.BEFOREND);
render(siteFooterElement, new FilmsCountComponent(`130 291`).getElement(), RenderPosition.BEFOREND);

const filmsContainerComponent = new FilmsContainerComponent();

render(siteMainElement, filmsContainerComponent.getElement(), RenderPosition.BEFOREND);
renderFilmsList(filmsContainerComponent, films);
