import {remove, render} from "../utils/render";
import {RenderPosition} from "../const";
import ShowMoreButtonComponent from "../components/show-more-button";
import SortFilmsComponent, {SortType} from "../components/sort-films";
import FilmsContainer from "../components/films-container";
import MovieController from "./movie-controller";
import ExtraFilmsComponent from "../components/extra-films";

const EXTRA_CARD_COUNT = 2;
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderMovies = (filmsListElement, films, onDataChange, onViewChange) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);

    movieController.render(film);

    return movieController;
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
      sortedFilms = showingFilms.sort((a, b) => b.fullDate - a.fullDate);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._showedFilmControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._filmsContainerComponent = new FilmsContainer();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortFilmsComponent();
    this._topRatedComponent = new ExtraFilmsComponent(`Top rated`);
    this._mostCommentedComponent = new ExtraFilmsComponent(`Most Commented`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render() {
    const container = this._container.getElement();
    const movies = this._moviesModel.getMovies();

    const filmListElement = container.querySelector(`.films-list`);

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);
    render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREND);

    this._renderMovies(movies.slice(0, this._showingMoviesCount));

    this._renderShowMoreButton();
  }

  _renderMovies(movies) {
    const container = this._container.getElement();

    const topRated = [...movies].sort((a, b) => b.rating - a.rating);
    const mostCommented = [...movies].sort((a, b) => b.comments.length - a.comments.length);

    render(container, this._topRatedComponent, RenderPosition.BEFOREND);
    let containerExtraFilm = this._topRatedComponent.getElement();
    renderMovies(containerExtraFilm.querySelector(`.films-list__container`), topRated, this._onDataChange, this._onViewChange);

    render(container, this._mostCommentedComponent, RenderPosition.BEFOREND);
    containerExtraFilm = this._mostCommentedComponent.getElement();
    renderMovies(containerExtraFilm.querySelector(`.films-list__container`), mostCommented, this._onDataChange, this._onViewChange);

    const filmContainerElement = this._filmsContainerComponent.getElement();

    const newMovies = renderMovies(filmContainerElement, movies, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = this._showedFilmControllers.concat(newMovies);

    this._showingMoviesCount = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const filmContainerElement = this._filmsContainerComponent.getElement();
    render(filmContainerElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevFilmsCount = this._showingMoviesCount;
      const movies = this._moviesModel.getMovies();
      this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

      const sortedFilms = getSortedFilms(movies, this._sortComponent.getSortType(), prevFilmsCount, this._showingMoviesCount);
      const newMovies = renderMovies(filmContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newMovies);
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const isSuccess = this._moviesModel.updateMovie(oldData.id, newData);

    if (isSuccess) {
      movieController.render(newData);
    }
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._moviesModel.getMovies(), sortType, 0, this._showingMoviesCount);
    const filmContainerElement = this._filmsContainerComponent.getElement();

    filmContainerElement.innerHTML = ``;

    const newMovies = renderMovies(filmContainerElement, sortedFilms, this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newMovies;

    this._renderShowMoreButton();
  }
}
