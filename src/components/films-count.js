import {createElement} from "../utils";

export const createFilmsCountTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class FilmsCount {
  constructor(count) {
    this.count = count;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate(this.count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
