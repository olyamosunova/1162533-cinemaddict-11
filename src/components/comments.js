import {EMOTIONS} from "../const";
import AbstractSmartComponent from "./abstract-smart-component";
import {encode} from 'he';

const createCommentMarkup = (comments) => {
  return comments.map((comment) => {
    const {id, emotion, date, author, message: notSanitizedMessage} = comment;

    const message = encode(notSanitizedMessage);

    return (
      `<li class="film-details__comment" id="${id}">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">${message}</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">${author}</span>
                    <span class="film-details__comment-day">${date}</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>`
    );
  }).join(`\n`);
};

const createEmojiMarkup = (isChecked, nameEmoji) => {
  return EMOTIONS.map((emotion) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${isChecked && emotion === nameEmoji ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emotion}">
            <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
        </label>`
    );
  }).join(`\n`);
};

const createCommentsTemplate = (comments, options) => {
  const {isEmojiShowing, nameEmoji} = options;

  const commentsCount = comments.length;
  const commentMarkup = createCommentMarkup(comments);
  const emotionMarkup = createEmojiMarkup(isEmojiShowing, nameEmoji);

  return (
    `<div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              ${isEmojiShowing ?
      `<img
                src="images/emoji/${nameEmoji}.png"
                width="55" height="55"
                alt="emoji-${nameEmoji}"
                >`
      : ``
    }
            </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emotionMarkup}
              </div>
            </div>
          </section>
        </div>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments, options) {
    super();

    this._comments = comments;
    this._options = options;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments, this._options);
  }
}
