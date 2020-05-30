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

const getUserRank = (movies) => {
  const countFilms = getHistoryMovies(movies).length;
  const ranks = Object.values(RANK);
  const userRank = ranks.filter(({minCount, maxCount, rank}) => (countFilms >= minCount && countFilms <= maxCount) ? rank : ``);

  return userRank;
};

export {formatMovieDuration, formatDate, formatCommentsDate, getUserRank};
