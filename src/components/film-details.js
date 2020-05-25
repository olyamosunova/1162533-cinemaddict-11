import AbstractSmartComponent from "./abstract-smart-component";
import CommentsComponent from "./comments";
import {encode} from 'he';

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createFilmDetailsTemplate = (film, options) => {
  const {title, poster, description, rating, duration,
    isAddWatchlist, isAlreadyWatched, isAddFavorites, originTitle, director, writers,
    actors, releaseDate, country, age, allGenres, comments} = film;

  const genreMarkup = createGenreMarkup(allGenres);
  const commentsComponent = new CommentsComponent(comments, options).getTemplate();

  const addedButtonActiveClass = isAddWatchlist ? `checked` : ``;
  const watchedButtonActiveClass = isAlreadyWatched ? `checked` : ``;
  const favoriteButtonActiveClass = isAddFavorites ? `checked` : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${poster} alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${allGenres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genreMarkup}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${addedButtonActiveClass}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watchedButtonActiveClass}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favoriteButtonActiveClass}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        ${commentsComponent}
      </form>
     </section>`
  );
};

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;

    this._isEmojiShowing = null;
    this._nameEmoji = null;
    this._commentText = null;

    this._addWatchButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoritesButtonClickHandler = null;
    this._closeButtonClickHandler = null;
    this._deleteButtonClickHandler = null;
    this._setCommentHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isEmojiShowing: this._isEmojiShowing,
      nameEmoji: this._nameEmoji,
      commentText: this._commentText,
    });
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setAddWatchButtonClickHandler(this._addWatchButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);
    this.setDeleteCommentButtonClickHandler(this._deleteButtonClickHandler);
    this.setSendCommentHandler(this._setCommentHandler);

    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this._isEmojiShowing = null;
    this._nameEmoji = null;
    this._commentText = null;

    this.rerender();
  }

  setAddWatchButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`)
      .addEventListener(`click`, handler);

    this._addWatchButtonClickHandler = handler;
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`click`, handler);

    this._watchedButtonClickHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`click`, handler);

    this._favoritesButtonClickHandler = handler;
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonClickHandler = handler;
  }

  setDeleteCommentButtonClickHandler(handler) {
    const deleteButtonElements = this._element.querySelectorAll(`.film-details__comment-delete`);
    if (deleteButtonElements) {
      deleteButtonElements.forEach((btn) => btn.addEventListener(`click`, handler));
    }

    this._deleteButtonClickHandler = handler;
  }

  setSendCommentHandler(handler) {
    const commentElement = this._element.querySelector(`.film-details__comment-input`);
    commentElement.addEventListener(`keydown`, handler);
    this._setCommentHandler = handler;
  }

  dataComment() {
    const text = encode(this._element.querySelector(`.film-details__comment-input`).value);
    const emotion = this._nameEmoji ? this._nameEmoji : ``;

    if (!emotion || !text) {
      return null;
    }

    const date = new Date();
    const id = String(new Date() + Math.random());
    const author = `user`;

    return {
      text,
      emotion,
      date,
      id,
      author,
    };
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    let message = ``;

    this._element.querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, (evt) => {
        message = encode(evt.target.value);
      });

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._isEmojiShowing = true;
        this._nameEmoji = evt.target.value;
        this._commentText = message;

        this.rerender();
      });
  }
}
