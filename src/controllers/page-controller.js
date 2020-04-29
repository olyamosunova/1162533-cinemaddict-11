import {remove, render} from "../utils/render";
import {RenderPosition} from "../const";
import ShowMoreButtonComponent from "../components/show-more-button";
import ExtraFilmListComponent from "../components/extra-film-list";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";
import SortFilmsComponent, {SortType} from "../components/sort-films";

const EXTRA_LIST_COUNT = 2;
const EXTRA_CARD_COUNT = 2;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;

const renderFilms = (filmsListElement, films) => {
  films.forEach((film) => {
    renderFilm(filmsListElement, film);
  });
};

const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];

  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
    case SortType.DATE:
      sortedFilms = showingFilms.sort((a, b) => b.year - a.year);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

const renderExtraFilms = (extraFilmListComponent, extrafilm) => {
  const filmExtraCardComponent = new FilmCardComponent(extrafilm);
  const extraFilmListElement = extraFilmListComponent.getElement().querySelector(`.films-list__container`);
  render(extraFilmListElement, filmExtraCardComponent, RenderPosition.BEFOREND);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortFilmsComponent();
  }

  render(films) {
    const renderShowMoreButton = () => {
      if (showingFilmsCount >= films.length) {
        return;
      }

      remove(this._showMoreButtonComponent);
      render(filmsListElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

      this._showMoreButtonComponent.setClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_CARD_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount);

        renderFilms(filmsListElement, sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);

    const filmsListElement = container.querySelector(`.films-list__container`);

    let showingFilmsCount = SHOWING_CARD_COUNT_ON_START;

    renderFilms(filmsListElement, films.slice(0, showingFilmsCount));
    renderShowMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_CARD_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      filmsListElement.innerHTML = ``;

      renderFilms(filmsListElement, sortedFilms);
      renderShowMoreButton();
    });

    const topRatedFilms = films.sort((a, b) => b.rating - a.rating).slice(0, EXTRA_CARD_COUNT);
    const mostCommentedFilms = films.sort((a, b) => b.comments.length - a.comments.length).slice(0, EXTRA_CARD_COUNT);

    for (let i = 0; i < EXTRA_LIST_COUNT; i++) {
      const extraFilmListComponent = new ExtraFilmListComponent();

      if (i === 0) {
        render(container, extraFilmListComponent, RenderPosition.BEFOREND);

        topRatedFilms.forEach((film) => {
          renderExtraFilms(extraFilmListComponent, film);
        });
      }

      if (i === 1) {
        render(container, extraFilmListComponent, RenderPosition.BEFOREND);

        mostCommentedFilms.forEach((film) => {
          renderExtraFilms(extraFilmListComponent, film);
        });
      }
    }
  }
}
