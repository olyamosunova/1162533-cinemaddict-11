import {formatTime, getRandomArrayItem, getRandomIntegerNumber} from '../utils/common';
import {MONTH_NAMES} from '../const.js';

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

const getRandomDate = () => {
  // создаем дату Thu Apr 09 2020 20:50:20 GMT+0200 (Центральная Африка)
  const targetDate = new Date();
  // рандомно вычисляем, будеи ли мы прибавлять к текущей дате или вычитать
  const sign = Math.random() > 0.5 ? 1 : -1;
  // рандомно прибавляем/вычисляем сгенирированное число дней (вв пределах недели)
  const diffValue = sign * getRandomIntegerNumber(0, 8);
  // конечная рандомная дата
  targetDate.setDate(targetDate.getDate() + diffValue);
  // приводим в следующий вид `2019/12/31 23:59`
  let day = (targetDate.getDay() / 10 < 1) ? (`0` + targetDate.getDay()) : targetDate.getDay();
  let month = (targetDate.getMonth() / 10 < 1) ? (`0` + targetDate.getMonth()) : targetDate.getMonth();
  let date = `${targetDate.getFullYear()}/${month}/${day} ${formatTime(targetDate)}`;

  return date;
};

const generateDescription = (count) => {
  let desctiptions = [];
  for (let i = 0; i < count; i++) {
    desctiptions.push(getRandomArrayItem(DESCRIPTIONS));
  }
  return desctiptions;
};

const createComment = () => {
  const dueDate = getRandomDate();
  return {
    emotion: getRandomArrayItem(EMOTIONS),
    date: dueDate,
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
  const countGenre = getRandomIntegerNumber(0, GENRES.length);
  for (let i = 0; i < countGenre; i++) {
    genreList.push(getRandomArrayItem(GENRES));
  }
  return genreList;
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(TITLES),
    poster: getRandomArrayItem(POSTERS),
    description: generateDescription(getRandomIntegerNumber(1, 5)),
    comments: generateComments(getRandomIntegerNumber(0, 5)),
    rating: getRandomIntegerNumber(0, 10),
    year: getRandomIntegerNumber(1895, 2020),
    duration: `${getRandomIntegerNumber(1, 3)}h ${getRandomIntegerNumber(1, 59)}m`,
    isAddWatchlist: Math.random() > PROBABILITY,
    isAlreadyWatched: Math.random() > PROBABILITY,
    isAddFavorites: Math.random() > PROBABILITY,
    originTitle: getRandomArrayItem(TITLES),
    director: getRandomArrayItem(ATHORS),
    writers: ATHORS,
    actors: ATHORS,
    releaseDate: `${getRandomIntegerNumber(1, 28)}
      ${getRandomArrayItem(MONTH_NAMES)}`,
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
