const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
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

export {formatTime, getRandomArrayItem, getRandomIntegerNumber, getRandomDate};
