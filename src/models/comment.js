export default class Comment {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`];
    this.emotion = data[`emotion`];
    this.text = data[`comment`];
    this.date = new Date(data[`date`]);
  }

  toRaw() {
    return {
      "comment": this.text,
      "date": this.date ? this.date.toISOString() : null,
      "emotion": this.emotion,
    };
  }

  static parseComment(comment) {
    return new Comment(comment);
  }

  static parseComments(comments) {
    return comments.map(Comment.parseComment);
  }

  static clone(comment) {
    return new Comment(comment.toRAW());
  }
}
