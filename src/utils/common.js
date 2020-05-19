import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {TimeToken, RANK} from "../const";
import {getHistoryMovies} from "./filter";

momentDurationFormatSetup(moment);

const formatMovieDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(TimeToken.TIME);
};

const formatDate = (date, timeToken) => {
  return moment(date).format(timeToken);
};

const formatCommentsDate = (date) => {
  return moment(date).fromNow();
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  // создаем дату Thu Apr 09 2020 20:50:20 GMT+0200 (Центральная Африка)
  const targetDate = new Date();
  // рандомно вычисляем количество дней, которое будем вычитать (в пределах 5 лет ~ 1825 дней)
  const diffValue = getRandomIntegerNumber(0, 1825);
  // конечная рандомная дата
  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const getRandomWatchedMovieDate = () => {
  // создаем дату Thu Apr 09 2020 20:50:20 GMT+0200 (Центральная Африка)
  const targetDate = new Date();
  // рандомно вычисляем количество дней, которое будем вычитать (в пределах 1 года ~ 365 дней)
  const diffValue = getRandomIntegerNumber(0, 365);
  // конечная рандомная дата
  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const getUserRank = (movies) => {
  const countFilms = getHistoryMovies(movies).length;
  const ranks = Object.values(RANK);
  const userRank = ranks.filter(({minCount, maxCount, rank}) => (countFilms >= minCount && countFilms <= maxCount) ? rank : ``);

  return userRank;
};

const getUniqueItems = (items) => {
  let result = [];

  for (let str of items) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};

export {formatMovieDuration, formatDate, formatCommentsDate, getRandomArrayItem, getUniqueItems,
  getRandomIntegerNumber, getRandomDate, getUserRank, getRandomWatchedMovieDate};
