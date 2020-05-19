import AbstractComponent from "./abstract-component";
import {getUserRank} from "../utils/common";

export const createProfileTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank !== `` ? rank[0].rank : ``}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    return createProfileTemplate(getUserRank(this._movies));
  }
}
