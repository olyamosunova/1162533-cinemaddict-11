import {FilterType} from "../const";

const getWatchlistMovies = (movies) => {
  return movies.filter((movie) => movie.isAddWatchlist);
};

const getHistoryMovies = (movies) => {
  return movies.filter((movie) => movie.isAlreadyWatched);
};

const getFavoritesMovies = (movies) => {
  return movies.filter((movie) => movie.isAddFavorites);
};

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.ALL:
      return movies;
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoritesMovies(movies);
  }
  return movies;
};

export {getWatchlistMovies, getHistoryMovies, getFavoritesMovies, getMoviesByFilter};
