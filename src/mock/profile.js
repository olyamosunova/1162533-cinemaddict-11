import {getRandomArrayItem} from '../utils.js';
const RANK = [``, `novice`, `fan`, `movie buff`];

// const RANK = {
//   none: {
//     rank: ``,
//     maxCount: 0
//   },
//
//   novice: {
//     rank: `novice`,
//     minCount: 1,
//     maxCount: 10,
//   },
//   fan: {
//     rank: `fan`,
//     minCount: 11,
//     maxCount: 20,
//   },
//   buff: {
//     rank: `buff`,
//     minCount: 21,
//   },
// };

export const rank = getRandomArrayItem(RANK);
