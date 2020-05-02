import AbstractComponent from "./abstract-component";
import {createElement} from "../utils/render";

const mostCommentedMarkup = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
     </section>`
  );
};

const createMostCommentedListTemplate = () => {
  return (
    `${mostCommentedMarkup()}`
  );
};

export default class MostCommented extends AbstractComponent {
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return createMostCommentedListTemplate();
  }
}
