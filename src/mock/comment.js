import {formatCommentsDate, getRandomArrayItem, getRandomDate} from "../utils/common";
import {EMOTIONS, ATHORS, COMMENTS} from "../const";

const createComment = () => {
  const dueDate = getRandomDate();
  return {
    id: String(new Date() + Math.random()),
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

export {generateComments};
