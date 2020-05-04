import AbstractComponent from "./abstract-component";

const createButtonMarkup = (name, nameControls, isActive = true) => {
  return (
    `<button
        class="film-card__controls-item button film-card__controls-item--${nameControls} ${isActive ? `` : `film-card__controls-item--active`}">
        ${name}
        </button>`
  );
};

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating,
    year, duration, allGenres} = film;

  const addedButton = createButtonMarkup(`Add to watchlist`, `add-to-watchlist`, !film.isAddWatchlist);
  const watchedButton = createButtonMarkup(`Mark as watched`, `mark-as-watched`, !film.isAlreadyWatched);
  const favoriteButton = createButtonMarkup(`Mark as favorite`, `favorite`, !film.isAddFavorites);

  return (
    `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${rating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${year}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${allGenres[0]}</span>
        </p>
        <img src=${poster} alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          ${addedButton}
          ${watchedButton}
          ${favoriteButton}
        </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setPosterClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`)
      .addEventListener(`click`, handler);
  }

  setTitleClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`)
      .addEventListener(`click`, handler);
  }

  setCommentsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__comments`)
      .addEventListener(`click`, handler);
  }

  setAddWatchButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }
}
