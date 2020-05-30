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

const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

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


export {RenderPosition, TimeToken, FilterType, RANK, EMOTIONS};
