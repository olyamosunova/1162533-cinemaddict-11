import {remove, render} from "../utils/render";
import {RenderPosition} from "../const";
import FilmDetailsComponent from "../components/film-details";
import FilmCardComponent from "../components/film-card";


export default class movieController {
  constructor(container) {
    this._container = container;

    this.filmCardComponent = null;
    this._filmDetailCOmponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this.filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsCOmponent = new FilmDetailsComponent(film);

    this.filmCardComponent.setPosterClickHandler(() => {
      this._openPopupElement();
    });

    this.filmCardComponent.setTitleClickHandler(() => {
      this._openPopupElement();
    });

    this.filmCardComponent.setCommentsClickHandler(() => {
      this._openPopupElement();
    });

    render(this._container, this.filmCardComponent, RenderPosition.BEFOREND);
  }

  _openPopupElement() {
    const bodyElement = document.querySelector(`body`);
    render(bodyElement, this._filmDetailsCOmponent, RenderPosition.BEFOREND);
    this._closePopupElement();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _closePopupElement() {
    this.filmCardComponent.setCloseButtonClickHandler(() => {
      remove(this.filmCardComponent);
    });
  }

  _onEscKeyDown(evt) {
    const isEscCode = evt.keyCode === 27;

    if (isEscCode) {
      remove(this._filmDetailsCOmponent);
    }
  }
}
