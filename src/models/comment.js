export default class Comment {
  constructor(comment) {
    this.id = comment[`id`];
    this.author = comment[`author`];
    this.emotion = comment[`emotion`];
    this.text = comment[`comment`];
    this.date = new Date(comment[`date`]);
  }

  toRAW() {
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
