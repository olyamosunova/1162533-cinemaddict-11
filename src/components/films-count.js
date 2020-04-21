import AbstractComponent from "./abstract-component";

export const createFilmsCountTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class FilmsCount extends AbstractComponent {
  constructor(count) {
    super();
    this.count = count;
  }

  getTemplate() {
    return createFilmsCountTemplate(this.count);
  }
}
