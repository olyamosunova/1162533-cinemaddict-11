import {formatMovieDuration, formatCommentsDate, getRandomDate,
  getRandomArrayItem, getRandomIntegerNumber, formatDate} from '../utils/common';
import {TimeToken} from "../const";

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

export const EMOTIONS = [`smile`, `sleeping`, `puke`, `angry`];

const COMMENTS = [`Interesting setting and a good cast`, `Booooooooooring`,
  `Very very old. Meh`, `Almost two hours? Seriously?`];

const GENRES = [`Musical`, `Western`, `Drama`, `Comedy`, `Cartoon`, `Mystery`];

const COUNTRIES = [`USA`, `Germany`, `France`, `UK`, `China`, `Russia`];

const generateDescription = (count) => {
  let descriptions = [];
  for (let i = 0; i < count; i++) {
    descriptions.push(getRandomArrayItem(DESCRIPTIONS));
  }
  return descriptions;
};

const createComment = () => {
  const dueDate = getRandomDate();
  return {
    emotion: getRandomArrayItem(EMOTIONS),
    date: formatCommentsDate(dueDate),
    author: getRandomArrayItem(ATHORS),
    message: getRandomArrayItem(COMMENTS),
  };
};

const generateComments = (count) => {
  let comments = [];
  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }
  return comments;
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
