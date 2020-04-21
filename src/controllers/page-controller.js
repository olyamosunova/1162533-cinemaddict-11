import {remove, render} from "../utils/render";
import {RenderPosition} from "../const";
import ShowMoreButtonComponent from "../components/show-more-button";
import ExtraFilmListComponent from "../components/extra-film-list";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";

const EXTRA_LIST_COUNT = 2;
const EXTRA_CARD_COUNT = 2;
const SHOWING_CARD_COUNT_ON_START = 5;
const SHOWING_CARD_COUNT_BY_BUTTON = 5;

const renderFilm = (filmsListElement, film) => {
  const closePopupElement = () => {
    filmDetailsComponent.setCloseButtonClickHandler(() => {
      remove(filmDetailsComponent);
    });
  };

  const onEscKeyDown = (evt) => {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      remove(filmDetailsComponent);
    }
  };

  const openPopupElement = () => {
    const bodyElement = document.querySelector(`body`);
    render(bodyElement, filmDetailsComponent, RenderPosition.BEFOREND);
    closePopupElement();
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmCardComponent = new FilmCardComponent(film);

  filmCardComponent.setPosterClickHandler(() => {
    openPopupElement();
  });

  filmCardComponent.setTitleClickHandler(() => {
    openPopupElement();
  });

  filmCardComponent.setCommentsClickHandler(() => {
    openPopupElement();
  });

  render(filmsListElement, filmCardComponent, RenderPosition.BEFOREND);
};

const renderExtraFilms = (extraFilmListComponent, extrafilm) => {
  const filmExtraCardComponent = new FilmCardComponent(extrafilm);
  const extraFilmListElement = extraFilmListComponent.getElement().querySelector(`.films-list__container`);
  render(extraFilmListElement, filmExtraCardComponent, RenderPosition.BEFOREND);
};

export default class PageController {
  constructor(container) {
    this._container = container;
  }

  render(films) {
    const container = this._container.getElement();

    const filmsListElement = container.querySelector(`.films-list__container`);

    let showingTasksCount = SHOWING_CARD_COUNT_ON_START;
    films.slice(0, showingTasksCount)
      .forEach((film) => {
        renderFilm(filmsListElement, film);
      });

    const showMoreButtonComponent = new ShowMoreButtonComponent();
    render(container, showMoreButtonComponent, RenderPosition.BEFOREND);

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

    showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_CARD_COUNT_BY_BUTTON;

      films.slice(prevTasksCount, showingTasksCount)
        .forEach((film) => renderFilm(filmsListElement, film));

      if (showingTasksCount >= films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }
}
