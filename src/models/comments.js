export default class Comments {
  constructor(data) {
    console.log(data);

    return data;
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }
}
