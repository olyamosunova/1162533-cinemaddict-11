import {remove, replace, render} from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";
import MovieModel from "../models/movie";

export const Mode = {
  DEFAULT: `default`,
  POPUP_OPENED: `popup-opened`,
};

const SHAKE_ANIMATION_TIMEOUT = 600;
const MILLISECONDS_IN_MINUTE = 1000;
const ESC_KEY_CODE = 27;

export default class MovieController {
  constructor(container, onDataChange, onViewChange, api) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;
    this._api = api;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._film = film;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setPosterClickHandler(() => {
      this._openPopupElement();
    });

    this._filmCardComponent.setTitleClickHandler(() => {
      this._openPopupElement();
    });

    this._filmCardComponent.setCommentsClickHandler(() => {
      this._openPopupElement();
    });

    this._filmCardComponent.setAddWatchButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAddWatchlist`);
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAlreadyWatched`);
    });

    this._filmCardComponent.setFavoritesButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAddFavorites`);
    });

    this._filmDetailsComponent.setAddWatchButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAddWatchlist`);
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAlreadyWatched`);
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler((evt) => {
      this._changeFilmControls(evt, film, `isAddFavorites`);
    });

    this._filmDetailsComponent.setDeleteCommentButtonClickHandler((evt) => {
      evt.preventDefault();

      const deleteButton = evt.target;
      const commentElement = deleteButton.closest(`.film-details__comment`);
      const deleteCommentId = commentElement.id;
      const newMovie = MovieModel.clone(film);

      this._api.deleteComment(deleteCommentId)
        .then(() => {
          evt.target.setAttribute(`disabled`, `true`);
          evt.target.textContent = `Deleting…`;

          this._onDataChange(this, film, newMovie, this._mode);
        })
        .catch(() => {
          evt.target.removeAttribute(`disabled`);
          this._shakeCommentBlock(evt.target.closest(`.film-details__comment`));
        });
    });

    this._filmDetailsComponent.setSendCommentHandler((evt) => {
      evt.target.style.boxShadow = `none`;

      const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
      if (isCtrlAndEnter) {
        const formElements = this._filmDetailsComponent.getElement().querySelector(`form`)
          .querySelectorAll(`input, textarea, button`);

        const newComment = this._filmDetailsComponent.getDataComment();

        const newMovie = MovieModel.clone(film);

        this._api.createComment(film.id, newComment)
          .then(() => {
            newMovie.comments.concat(newComment);

            this._disableFields(formElements);

            this._onDataChange(this, film, newMovie, this._mode);
          })
          .catch(() => {
            this._enableFields(formElements);
            this.shake();
            this._addErrorStyle();
          });
      }
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closePopupElement();
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopupElement();
    }
  }

  destroy() {
    remove(this._filmDetailsComponent);
    remove(this._filmCardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._filmDetailsComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MILLISECONDS_IN_MINUTE}s`;

    setTimeout(() => {
      this._filmDetailsComponent.getElement().style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _closePopupElement() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent.reset();
    this._mode = Mode.DEFAULT;

    const newMovie = MovieModel.clone(this._film);
    this._onDataChange(this, this._film, newMovie, this._mode);
  }

  _openPopupElement() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);

    render(bodyElement, this._filmDetailsComponent, RenderPosition.BEFOREND);
    this._mode = Mode.POPUP_OPENED;

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscCode = evt.keyCode === ESC_KEY_CODE;

    if (isEscCode) {
      this._closePopupElement();
    }
  }

  _changeFilmControls(evt, film, property) {
    evt.preventDefault();

    const newMovie = MovieModel.clone(film);
    newMovie[property] = !newMovie[property];

    if (property === `isAlreadyWatched`) {
      newMovie[`watchingDate`] = newMovie[`watchingDate`] ? null : new Date();
    }

    this._onDataChange(this, film, newMovie, this._mode);
  }

  _shakeCommentBlock(commentBlock) {
    commentBlock.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / MILLISECONDS_IN_MINUTE}s`;

    setTimeout(() => {
      commentBlock.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _addErrorStyle() {
    this._filmDetailsComponent.getElement().querySelector(`textarea`).style.boxShadow = `0 0 10px 2px red`;
  }

  _disableFields(elements) {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `true`);
    });
  }

  _enableFields(elements) {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`);
    });
  }
}
