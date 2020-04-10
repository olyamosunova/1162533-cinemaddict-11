const generateFilters = (films) => {
  return [{
    title: `All movies`,
  }, {
    title: `Watchlist`,
    count: films.filter((film) => film.isAddWatchlist ? film : ``).length,
  }, {
    title: `History`,
    count: films.filter((film) => film.isAlreadyWatched ? film : ``).length,
  }, {
    title: `Favorites`,
    count: films.filter((film) => film.isAddFavorites ? film : ``).length,
  }];
};

export {generateFilters};
