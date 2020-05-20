export default class NewComment {
  static toRAW(data) {
    return {
      "comment": data.text,
      "date": data.date,
      "emotion": data.emotion
    };
  }
}
