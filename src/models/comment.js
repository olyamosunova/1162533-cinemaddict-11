import {formatCommentsDate} from "../utils/common";

export default class Comment {
  constructor(data) {
    this._id = data[`id`];
    this._author = data[`author`];
    this._emotion = data[`emotion`];
    this._comment = data[`comment`];
    this._date = formatCommentsDate(new Date(data[`date`]));
  }

  toRAW() {
    return {
      "comment": this._comment,
      "date": new Date(this._date),
      "emotion": this._emotion,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
