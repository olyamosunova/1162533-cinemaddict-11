import {remove, replace, render} from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";
import MovieModel from "../models/movie";
import CommentModel from "../models/comment";

export const Mode = {
  DEFAULT: `default`,
  POPUP_OPENED: `popup-opened`,
};

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

  render(film, mode) {
    this._film = film;
    this._movieId = this._film.id;
    this._mode = mode;
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._film.comments = comments;

        this._filmCardComponent = new FilmCardComponent(film);
        this._filmDetailsComponent = new FilmDetailsComponent(this._film);

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
          evt.preventDefault();

          const newMovie = MovieModel.clone(film);
          newMovie.isAddWatchlist = !newMovie.isAddWatchlist;

          this._onDataChange(this, film, newMovie);
        });

        this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
          evt.preventDefault();
          const newMovie = MovieModel.clone(film);
          newMovie.isAlreadyWatched = !newMovie.isAlreadyWatched;
          newMovie.watchingDate = newMovie.watchingDate ? null : new Date();

          this._onDataChange(this, film, newMovie);
        });

        this._filmCardComponent.setFavoritesButtonClickHandler((evt) => {
          evt.preventDefault();

          const newMovie = MovieModel.clone(film);
          newMovie.isAddFavorites = !newMovie.isAddFavorites;

          this._onDataChange(this, film, newMovie);
        });

        this._filmDetailsComponent.setAddWatchButtonClickHandler(() => {
          const newMovie = MovieModel.clone(film);
          newMovie.isAddWatchlist = !newMovie.isAddWatchlist;

          this._onDataChange(this, film, newMovie);
        });

        this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
          const newMovie = MovieModel.clone(film);
          newMovie.isAlreadyWatched = !newMovie.isAlreadyWatched;
          newMovie.watchingDate = newMovie.watchingDate ? null : new Date();

          this._onDataChange(this, film, newMovie);
        });

        this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
          const newMovie = MovieModel.clone(film);
          newMovie.isAddFavorites = !newMovie.isAddFavorites;

          this._onDataChange(this, film, newMovie);
        });

        this._filmDetailsComponent.setDeleteCommentButtonClickHandler((evt) => {
          evt.preventDefault();

          const deleteButton = evt.target;
          const commentElement = deleteButton.closest(`.film-details__comment`);

          const deleteCommentId = commentElement.id;
          const comments = this._film.comments.filter((comment) => comment.id !== deleteCommentId);

          this._onDataChange(this, this._film, Object.assign(this._film, {comments}));
        });

        this._filmDetailsComponent.setSendCommentHandler((evt) => {
          const isCtrlAndEnter = evt.code === `Enter` && (evt.ctrlKey || evt.metaKey);
          if (isCtrlAndEnter) {
            const newComment = this._filmDetailsComponent.dataComment();
            const comment = new CommentModel(newComment);

            if (!comment) {
              return;
            }

            const newMovie = MovieModel.clone(film);

            this._api.createComment(this._movieId, comment)
              .then((commentsData) => {
                this._film.comments = commentsData;
                newMovie.comments.concat(newComment);

                this._onDataChange(this, film, newMovie);
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
      });
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
