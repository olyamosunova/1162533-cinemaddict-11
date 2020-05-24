import Movie from "./models/movie";

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((movies) => Promise.all(movies.map((movie) => this._getComments(movie))))
      .then(Movie.parseMovies);
  }

  _getComments(movie) {
    return this._load({url: `comments/${movie.id}`})
      .then((response) => response.json())
      .then((commentsList) => Object.assign({}, movie, {comments: commentsList}));
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: `PUT`,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then((movie) => this._getComments(movie))
      .then(Movie.parseMovies);
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
