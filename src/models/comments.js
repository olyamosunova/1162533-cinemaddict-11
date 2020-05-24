export default class Comments {
  constructor(data) {
    // console.log(data);
    this._id = data[`id`];
    this._author = data[`author`];
    this._emotion = data[`emotion`];
    this._comment = data[`comment`];
    this._date = data[`date`];
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }
}
