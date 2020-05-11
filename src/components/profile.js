import AbstractComponent from "./abstract-component";
import {getHistoryMovies} from "../utils/filter";

const RANK = {
  novice: {
    rank: `novice`,
    minCount: 1,
    maxCount: 10,
  },
  fan: {
    rank: `fan`,
    minCount: 11,
    maxCount: 20,
  },
  movieBuff: {
    rank: `movie buff`,
    minCount: 21,
    maxCount: Infinity,
  },
};

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
    return createProfileTemplate(this.getUserRank());
  }

  getUserRank() {
    const countFilms = getHistoryMovies(this._movies).length;
    const ranks = Object.values(RANK);
    const userRank = ranks.filter(({minCount, maxCount, rank}) => (countFilms >= minCount && countFilms <= maxCount) ? rank : ``);

    return userRank;
  }
}
