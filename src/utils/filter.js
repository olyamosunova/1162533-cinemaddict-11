import {FilterType} from "../const";

const getMoviesByProperty = (movies, property) => movies.filter((movie) => movie[property]);

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return getMoviesByProperty(movies, `isAddWatchlist`);
    case FilterType.HISTORY:
      return getMoviesByProperty(movies, `isAlreadyWatched`);
    case FilterType.FAVORITES:
      return getMoviesByProperty(movies, `isAddFavorites`);
  }
  return movies;
};

export {getMoviesByProperty, getMoviesByFilter};
