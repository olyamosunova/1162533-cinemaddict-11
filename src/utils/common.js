import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {TimeToken} from "../const";

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

export {formatMovieDuration, formatDate, formatCommentsDate, getRandomArrayItem, getRandomIntegerNumber, getRandomDate};
