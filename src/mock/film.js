import {formatMovieDuration, getRandomDate,
  getRandomArrayItem, getRandomIntegerNumber, formatDate} from '../utils/common';
import {TimeToken, PROBABILITY, TITLES, POSTERS,
  ATHORS, DESCRIPTIONS, GENRES, COUNTRIES} from "../const";
import {generateComments} from "./comment";

const generateDescription = (count) => {
  let descriptions = [];
  for (let i = 0; i < count; i++) {
    descriptions.push(getRandomArrayItem(DESCRIPTIONS));
  }
  return descriptions;
};

const generateGenre = () => {
  const genreList = [];
  const countGenre = getRandomIntegerNumber(1, GENRES.length);
  for (let i = 0; i < countGenre; i++) {
    genreList.push(getRandomArrayItem(GENRES));
  }
  return genreList;
};

const generateFilm = () => {
  const dueDate = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
    fullDate: dueDate,
    title: getRandomArrayItem(TITLES),
    poster: getRandomArrayItem(POSTERS),
    description: generateDescription(getRandomIntegerNumber(1, 5)),
    comments: generateComments(getRandomIntegerNumber(0, 5)),
    rating: getRandomIntegerNumber(0, 10),
    year: formatDate(dueDate, TimeToken.YEAR),
    duration: formatMovieDuration(getRandomIntegerNumber(30, 360)),
    isAddWatchlist: Math.random() > PROBABILITY,
    isAlreadyWatched: Math.random() > PROBABILITY,
    isAddFavorites: Math.random() > PROBABILITY,
    originTitle: getRandomArrayItem(TITLES),
    director: getRandomArrayItem(ATHORS),
    writers: ATHORS,
    actors: ATHORS,
    releaseDate: formatDate(dueDate, TimeToken.DATE),
    country: getRandomArrayItem(COUNTRIES),
    age: getRandomIntegerNumber(0, 18),
    allGenres: generateGenre(),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
