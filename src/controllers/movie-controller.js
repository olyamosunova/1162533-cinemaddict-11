import {remove, replace, render} from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";

const Mode = {
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

  render(film) {
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

  _openPopupElement() {
    const bodyElement = document.querySelector(`body`);
    render(bodyElement, this._filmDetailsComponent, RenderPosition.BEFOREND);
    this._closePopupElement();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopupElement() {
    this._filmDetailsComponent.setCloseButtonClickHandler(() => {
      remove(this._filmDetailsComponent);
    });
  }

  _onEscKeyDown(evt) {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      remove(this._filmDetailsComponent);
    }
  }
}
