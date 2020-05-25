import {formatDate, formatMovieDuration} from "../utils/common";
import {TimeToken} from "../const";

export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`] || ``;
    this.comments = data[`comments`] || ``;
    this.rating = data.film_info[`total_rating`];
    this.year = formatDate(new Date(data.film_info.release[`date`]), TimeToken.YEAR);
    this.runtime = data.film_info[`runtime`];
    this.duration = formatMovieDuration(data.film_info[`runtime`]);
    this.isAddWatchlist = Boolean(data.user_details[`watchlist`]);
    this.isAlreadyWatched = Boolean(data.user_details[`already_watched`]);
    this.isAddFavorites = Boolean(data.user_details[`favorite`]);
    this.watchingDate = data.user_details[`watching_date`] ? new Date(data.user_details[`watching_date`]) : null;
    this.originTitle = data.film_info[`alternative_title`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`writers`];
    this.actors = data.film_info[`actors`];
    this.release = new Date(data.film_info.release[`date`]);
    this.releaseDate = formatDate(new Date(data.film_info.release[`date`]), TimeToken.DATE);
    this.country = data.film_info.release[`release_country`];
    this.age = data.film_info[`age_rating`];
    this.allGenres = data.film_info[`genre`];
  }

  toRAW(clone = false) {
    const comments = clone ? this.comments.map(({id}) => id) : this.comments;
    const watchingDate = this.watchingDate ? this.watchingDate : null;

    return {
      "id": this.id,
      "comments": comments,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originTitle,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.release.toISOString(),
          "release_country": this.country
        },
        "runtime": this.runtime,
        "genre": this.allGenres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.isAddWatchlist,
        "already_watched": this.isAlreadyWatched,
        "watching_date": watchingDate,
        "favorite": this.isAddFavorites
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW(true));
  }
}
