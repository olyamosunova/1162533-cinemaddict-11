const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREND: `beforend`,
  BEFOREBEGIN: `beforebegin`,
};

const TimeToken = {
  TIME: `h[h] m[m]`,
  DATE: `DD MMMM YYYY`,
  YEAR: `YYYY`,
};

const PROBABILITY = 0.5;

const TITLES = [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`, `Made for Each Other`];

const POSTERS = [`./images/posters/the-dance-of-life.jpg`, `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`, `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/sagebrush-trail.jpg`, `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/the-great-flamarion.jpg`, `./images/posters/made-for-each-other.png`];

const ATHORS = [`Tim Macoveev`, `John Doe`, `Fiona`, `Rose`, `Bella`];

const DESCRIPTIONS = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];

const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const COMMENTS = [`Interesting setting and a good cast`, `Booooooooooring`,
  `Very very old. Meh`, `Almost two hours? Seriously?`];

const GENRES = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

const COUNTRIES = [`USA`, `Germany`, `France`, `UK`, `China`, `Russia`];

const FilterType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
};

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


export {RenderPosition, TimeToken, FilterType, RANK,
  PROBABILITY, TITLES, POSTERS, ATHORS, DESCRIPTIONS, EMOTIONS, COMMENTS, GENRES, COUNTRIES};
