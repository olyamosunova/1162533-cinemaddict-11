import Movie from "../models/movie";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

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

  createComment(movieId, comment) {
    return this._load({
      url: `comments/${movieId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
  }

  updateMovie(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then((movie) => this._getComments(movie))
      .then(Movie.parseMovie);
  }

  _getComments(movie) {
    return this._load({
      url: `comments/${movie.id}`
    })
      .then((response) => response.json())
      .then((commentsList) => Object.assign({}, movie, {comments: commentsList}));
  }

  sync(data) {
    return this._load({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _load({url, method = `GET`, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
