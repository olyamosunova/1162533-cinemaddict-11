import {EMOTIONS} from "../mock/film";
import AbstractSmartComponent from "./abstract-smart-component";

const createCommentMarkup = (comments) => {
  return comments.map((comment) => {
    const {emotion, date, author, message} = comment;
    return (
      `<li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${message}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${author}</span>
                    <span class="film-details__comment-day">${date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`
    );
  }).join(`\n`);
};

const createEmojiMarkup = (isChecked, nameEmoji) => {
  return EMOTIONS.map((emotion) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked && emotion === nameEmoji ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
            <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`
    );
  }).join(`\n`);
};

const createGenreMarkup = (genres) => {
  return genres.map((genre) => {
    return (
      `<span class="film-details__genre">${genre}</span>`
    );
  }).join(`\n`);
};

const createFilmDetailsTemplate = (film, options) => {
  const {title, poster, description, comments, rating, year, duration,
    isAddWatchlist, isAlreadyWatched, isAddFavorites, originTitle, director, writers,
    actors, releaseDate, country, age, allGenres} = film;
  const {isEmojiShowing, nameEmoji} = options;

  const commentsCount = comments.length;
  const commentMarkup = createCommentMarkup(comments);
  const genreMarkup = createGenreMarkup(allGenres);
  const emotionMarkup = createEmojiMarkup(isEmojiShowing, nameEmoji);

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
                  <td class="film-details__cell">${releaseDate} ${year}</td>
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

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              ${isEmojiShowing ?
      `<img
                src="images/emoji/${nameEmoji}.png"
                width="55" height="55"
                alt="emoji-${nameEmoji}"
                >`
      : ``
    }
            </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emotionMarkup}
              </div>
            </div>
          </section>
        </div>
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

    this._addWatchButtonClickHandler = null;
    this._watchedButtonClickHandler = null;
    this._favoritesButtonClickHandler = null;
    this._closeButtonClickHandler = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, {
      isEmojiShowing: this._isEmojiShowing,
      nameEmoji: this._nameEmoji,
    });
  }

  recoveryListeners() {
    this.setCloseButtonClickHandler(this._closeButtonClickHandler);
    this.setAddWatchButtonClickHandler(this._addWatchButtonClickHandler);
    this.setWatchedButtonClickHandler(this._watchedButtonClickHandler);
    this.setFavoritesButtonClickHandler(this._favoritesButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    // const film = this._film;

    this._isEmojiShowing = null;
    this._nameEmoji = null;

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

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        this._isEmojiShowing = true;
        this._nameEmoji = evt.target.value;

        this.rerender();
      });
  }
}
