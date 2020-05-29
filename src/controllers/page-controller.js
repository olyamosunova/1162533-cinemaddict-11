import {remove, render} from "../utils/render";
import {RenderPosition} from "../const";
import ShowMoreButtonComponent from "../components/show-more-button";
import SortFilmsComponent, {SortType} from "../components/sort-films";
import FilmsContainer from "../components/films-container";
import MovieController, {Mode as MovieControllerMode} from "./movie-controller";
import ExtraFilmsComponent from "../components/extra-films";
import ProfileComponent from "../components/profile";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const renderMovies = (filmsListElement, films, onDataChange, onViewChange, api) => {
  return films.map((film) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange, api);

    movieController.render(film, MovieControllerMode);

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
      sortedFilms = showingFilms.sort((a, b) => b.release - a.release);
      break;
    case SortType.RATING:
      sortedFilms = showingFilms.sort((a, b) => b.rating - a.rating);
      break;
  }

  return sortedFilms.slice(from, to);
};

export default class PageController {
  constructor(container, moviesModel, api) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._api = api;

    this._showedFilmControllers = [];
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
    this._filmsContainerComponent = new FilmsContainer();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortFilmsComponent();
    this._topRatedComponent = new ExtraFilmsComponent(`Top rated`);
    this._mostCommentedComponent = new ExtraFilmsComponent(`Most Commented`);
    this._siteHeaderElement = document.querySelector(`.header`);

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._renderExtraMovies = this._renderExtraMovies.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const container = this._container.getElement();
    const movies = this._moviesModel.getMovies();

    const filmListElement = container.querySelector(`.films-list`);

    render(container, this._sortComponent, RenderPosition.BEFOREBEGIN);
    render(filmListElement, this._filmsContainerComponent, RenderPosition.BEFOREND);

    this._profileComponent = new ProfileComponent(movies);
    render(this._siteHeaderElement, this._profileComponent, RenderPosition.BEFOREND);

    this._renderMovies(movies.slice(0, this._showingMoviesCount));

    this._renderTopRatedMovies();
    this._renderMostCommentedMovies();

    this._renderShowMoreButton();
  }

  _removeMovies() {
    this._showedFilmControllers.forEach((movieController) => movieController.destroy());
    this._showedFilmControllers = [];
  }

  _renderMovies(movies) {
    const filmContainerElement = this._filmsContainerComponent.getElement();

    const newMovies = renderMovies(filmContainerElement, movies, this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedFilmControllers.concat(newMovies);
  }

  _renderShowMoreButton() {
    remove(this._showMoreButtonComponent);

    if (this._showingMoviesCount >= this._moviesModel.getMovies().length) {
      return;
    }

    const filmContainerElement = this._filmsContainerComponent.getElement();
    render(filmContainerElement, this._showMoreButtonComponent, RenderPosition.AFTEREND);

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _renderTopRatedMovies() {
    if (this._topRatedComponent) {
      remove(this._topRatedComponent);
    }

    this._extraMovies = this._moviesModel.getTopRatedMovies();
    if (this._extraMovies.length !== 0) {
      this._renderExtraMovies(this._topRatedComponent, this._extraMovies);
    }
  }

  _renderMostCommentedMovies() {
    if (this._mostCommentedComponent) {
      remove(this._mostCommentedComponent);
    }

    this._extraMovies = this._moviesModel.getMostCommentedMovies();
    if (this._extraMovies.length !== 0) {
      this._renderExtraMovies(this._mostCommentedComponent, this._extraMovies);
    }
  }

  _renderExtraMovies(component, extraMovies) {
    render(this._container.getElement(), component, RenderPosition.BEFOREND);
    const extraMoviesContainer = component.getElement().querySelector(`.films-list__container`);

    const newMovies = renderMovies(extraMoviesContainer, extraMovies, this._onDataChange, this._onViewChange, this._api);
    this._showedFilmControllers = this._showedFilmControllers.concat(newMovies);
  }

  _rerenderExtraMovies() {
    this._renderTopRatedMovies();
    this._renderMostCommentedMovies();
  }

  _updateMovies(count) {
    this._showingMoviesCount = count;
    this._removeMovies();
    this._renderMovies(this._moviesModel.getMovies().slice(0, count));
    this._renderShowMoreButton();
    this._rerenderExtraMovies();
  }

  _onDataChange(movieController, oldData, newData) {
    this._api.updateMovie(oldData.id, newData)
      .then((moviesModel) => {
        const isSuccess = this._moviesModel.updateMovie(oldData.id, moviesModel);
        if (isSuccess) {
          movieController.render(moviesModel, MovieControllerMode.DEFAULT);

          remove(this._profileComponent);
          this._profileComponent = new ProfileComponent(this._moviesModel.getMoviesAll());
          render(this._siteHeaderElement, this._profileComponent, RenderPosition.BEFOREND);
        }
      })
      .catch(() => {
        movieController.shake();
      });
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

    const sortedFilms = getSortedFilms(this._moviesModel.getMovies(), sortType, 0, this._showingMoviesCount);

    this._removeMovies();
    this._renderMovies(sortedFilms);
    this._rerenderExtraMovies();

    this._renderShowMoreButton();
  }

  _onShowMoreButtonClick() {
    const prevFilmsCount = this._showingMoviesCount;
    const movies = this._moviesModel.getMovies();

    this._showingMoviesCount = this._showingMoviesCount + SHOWING_MOVIES_COUNT_BY_BUTTON;

    const sortedFilms = getSortedFilms(movies, this._sortComponent.getSortType(), prevFilmsCount, this._showingMoviesCount);

    this._renderMovies(sortedFilms);

    if (this._showingMoviesCount >= movies.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateMovies(SHOWING_MOVIES_COUNT_ON_START);
    this._sortComponent.reset();
  }
}
