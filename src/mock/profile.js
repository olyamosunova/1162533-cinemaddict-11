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

const getUserRank = (filters) => {
  const countFilms = filters.filter((it) => it.title.includes(`History`)).map(({count}) => count);
  const ranks = Object.values(RANK);
  const userRank = ranks.filter(({minCount, maxCount, rank}) => (countFilms >= minCount && countFilms <= maxCount) ? rank : ``);
  return userRank;
};

export {getUserRank};
