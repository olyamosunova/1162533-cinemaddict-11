import {remove, replace, render} from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";

export const Mode = {
  DEFAULT: `default`,
  POPUP_OPENED: `popup-opened`,
};


export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film, mode) {
    this._mode = mode;
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

    this._filmCardComponent.setAddWatchButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddWatchlist: !film.isAddWatchlist,
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAlreadyWatched: !film.isAlreadyWatched,
      }));
    });

    this._filmCardComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddFavorites: !film.isAddFavorites,
      }));
    });

    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      this._closePopupElement();
    });

    this._filmDetailsComponent.setAddWatchButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddWatchlist: !film.isAddWatchlist,
      }));
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAlreadyWatched: !film.isAlreadyWatched,
      }));
    });

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddFavorites: !film.isAddFavorites,
      }));
    });

    this._filmDetailsComponent.setDeleteButtonClickHandler((evt) => {
      evt.preventDefault();

      const deleteButton = evt.target;
      const commentElement = deleteButton.closest(`.film-details__comment`);
      const deleteCommentId = commentElement.id;
      const comments = film.comments.filter((comment) => comment.id !== deleteCommentId);

      this._onDataChange(this, film, Object.assign(film, {comments}));
    });

    this._filmDetailsComponent.setSendCommentHandler((evt) => {
      const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
      if (isCtrlAndEnter) {
        const comment = this._filmDetailsComponent.dataComment();

        if (!comment) {
          return;
        }

        const newComments = film.comments.concat(comment);
        this._onDataChange(this, film, Object.assign(film, {comments: newComments}));
      }
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

  _closePopupElement() {
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    remove(this._filmDetailsComponent);
    this._filmDetailsComponent.reset();
    this._mode = Mode.DEFAULT;
  }

  _openPopupElement() {
    this._onViewChange();
    const bodyElement = document.querySelector(`body`);
    render(bodyElement, this._filmDetailsComponent, RenderPosition.BEFOREND);
    this._mode = Mode.POPUP_OPENED;

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      this._closePopupElement();
    }
  }
}
