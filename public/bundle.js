/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/film-card-most-commented.js":
/*!****************************************************!*\
  !*** ./src/components/film-card-most-commented.js ***!
  \****************************************************/
/*! exports provided: createFilmCardMostCommentedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardMostCommentedTemplate", function() { return createFilmCardMostCommentedTemplate; });
const createFilmCardMostCommentedTemplate = () => {
  return (
    `<article class="film-card">
          <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
          <p class="film-card__rating">2.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1964</span>
            <span class="film-card__duration">1h 21m</span>
            <span class="film-card__genre">Comedy</span>
          </p>
          <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
          <a class="film-card__comments">465 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
     </article>`
  );
};


/***/ }),

/***/ "./src/components/film-card-top-rated.js":
/*!***********************************************!*\
  !*** ./src/components/film-card-top-rated.js ***!
  \***********************************************/
/*! exports provided: createFilmCardTopRatedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTopRatedTemplate", function() { return createFilmCardTopRatedTemplate; });
const createFilmCardTopRatedTemplate = () => {
  return (
    `<article class="film-card">
          <h3 class="film-card__title">The Man with the Golden Arm</h3>
          <p class="film-card__rating">9.0</p>
          <p class="film-card__info">
            <span class="film-card__year">1955</span>
            <span class="film-card__duration">1h 59m</span>
            <span class="film-card__genre">Drama</span>
          </p>
          <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
          <a class="film-card__comments">18 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: createFilmCardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmCardTemplate", function() { return createFilmCardTemplate; });
const createFilmCardTemplate = () => {
  return (
    `<article class="film-card">
        <h3 class="film-card__title">Sagebrush Trail</h3>
        <p class="film-card__rating">3.2</p>
        <p class="film-card__info">
          <span class="film-card__year">1933</span>
          <span class="film-card__duration">54m</span>
          <span class="film-card__genre">Western</span>
        </p>
        <img src="./images/posters/sagebrush-trail.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…</p>
        <a class="film-card__comments">89 comments</a>
        <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist film-card__controls-item--active">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
    </article>`
  );
};


/***/ }),

/***/ "./src/components/films-container.js":
/*!*******************************************!*\
  !*** ./src/components/films-container.js ***!
  \*******************************************/
/*! exports provided: createFilmsContainerTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsContainerTemplate", function() { return createFilmsContainerTemplate; });
const createFilmsContainerTemplate = () => {
  return (
    `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
          <div class="films-list__container"></div>
        </section>
     </section>`
  );
};


/***/ }),

/***/ "./src/components/films-count.js":
/*!***************************************!*\
  !*** ./src/components/films-count.js ***!
  \***************************************/
/*! exports provided: createFilmsCountTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsCountTemplate", function() { return createFilmsCountTemplate; });
const createFilmsCountTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};


/***/ }),

/***/ "./src/components/films-list-most-commented.js":
/*!*****************************************************!*\
  !*** ./src/components/films-list-most-commented.js ***!
  \*****************************************************/
/*! exports provided: createFilmsListMostCommentedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsListMostCommentedTemplate", function() { return createFilmsListMostCommentedTemplate; });
const createFilmsListMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
     </section>`
  );
};


/***/ }),

/***/ "./src/components/films-list-top-rated.js":
/*!************************************************!*\
  !*** ./src/components/films-list-top-rated.js ***!
  \************************************************/
/*! exports provided: createFilmsListTopRatedTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmsListTopRatedTemplate", function() { return createFilmsListTopRatedTemplate; });
const createFilmsListTopRatedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container"></div>
     </section>`
  );
};


/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! exports provided: createMenuTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMenuTemplate", function() { return createMenuTemplate; });
const createMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};


/***/ }),

/***/ "./src/components/profile.js":
/*!***********************************!*\
  !*** ./src/components/profile.js ***!
  \***********************************/
/*! exports provided: createProfileTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProfileTemplate", function() { return createProfileTemplate; });
const createProfileTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ }),

/***/ "./src/components/show-more-button.js":
/*!********************************************!*\
  !*** ./src/components/show-more-button.js ***!
  \********************************************/
/*! exports provided: createShowMoreButtonTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createShowMoreButtonTemplate", function() { return createShowMoreButtonTemplate; });
const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};


/***/ }),

/***/ "./src/components/sort-films.js":
/*!**************************************!*\
  !*** ./src/components/sort-films.js ***!
  \**************************************/
/*! exports provided: createSortFilmsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortFilmsTemplate", function() { return createSortFilmsTemplate; });
const createSortFilmsTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
     </ul>`
  );
};


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_profile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile.js */ "./src/components/profile.js");
/* harmony import */ var _components_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/menu.js */ "./src/components/menu.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/show-more-button.js */ "./src/components/show-more-button.js");
/* harmony import */ var _components_film_card_top_rated_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/film-card-top-rated.js */ "./src/components/film-card-top-rated.js");
/* harmony import */ var _components_film_card_most_commented_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/film-card-most-commented.js */ "./src/components/film-card-most-commented.js");
/* harmony import */ var _components_films_container_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/films-container.js */ "./src/components/films-container.js");
/* harmony import */ var _components_films_list_top_rated_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/films-list-top-rated.js */ "./src/components/films-list-top-rated.js");
/* harmony import */ var _components_films_list_most_commented_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/films-list-most-commented.js */ "./src/components/films-list-most-commented.js");
/* harmony import */ var _components_sort_films_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/sort-films.js */ "./src/components/sort-films.js");
/* harmony import */ var _components_films_count_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/films-count.js */ "./src/components/films-count.js");






// import {createFilmDetailsTemplate} from "./components/film-details.js";






const CARD_COUNT = 5;
const EXTRA_CARD_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);

render(siteHeaderElement, Object(_components_profile_js__WEBPACK_IMPORTED_MODULE_0__["createProfileTemplate"])(), `beforeend`);

const siteMainElement = document.querySelector(`.main`);

render(siteMainElement, Object(_components_menu_js__WEBPACK_IMPORTED_MODULE_1__["createMenuTemplate"])(), `beforeend`);
render(siteMainElement, Object(_components_sort_films_js__WEBPACK_IMPORTED_MODULE_9__["createSortFilmsTemplate"])(), `beforeend`);
render(siteMainElement, Object(_components_films_container_js__WEBPACK_IMPORTED_MODULE_6__["createFilmsContainerTemplate"])(), `beforeend`);

const filmsElement = siteMainElement.querySelector(`.films`);
const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListContainerElement, Object(_components_film_card_js__WEBPACK_IMPORTED_MODULE_2__["createFilmCardTemplate"])(), `beforeend`);
}

render(filmsListElement, Object(_components_show_more_button_js__WEBPACK_IMPORTED_MODULE_3__["createShowMoreButtonTemplate"])(), `beforeend`);
render(filmsElement, Object(_components_films_list_top_rated_js__WEBPACK_IMPORTED_MODULE_7__["createFilmsListTopRatedTemplate"])(), `beforeend`);
render(filmsElement, Object(_components_films_list_most_commented_js__WEBPACK_IMPORTED_MODULE_8__["createFilmsListMostCommentedTemplate"])(), `beforeend`);

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

filmsListExtraElements.forEach((item, i) => {
  const containerElement = item.querySelector(`.films-list__container`);

  if (i === 0) {
    for (let j = 0; j < EXTRA_CARD_COUNT; j++) {
      render(containerElement, Object(_components_film_card_top_rated_js__WEBPACK_IMPORTED_MODULE_4__["createFilmCardTopRatedTemplate"])(), `beforeend`);
    }
  } else {
    for (let j = 0; j < EXTRA_CARD_COUNT; j++) {
      render(containerElement, Object(_components_film_card_most_commented_js__WEBPACK_IMPORTED_MODULE_5__["createFilmCardMostCommentedTemplate"])(), `beforeend`);
    }
  }
});

const siteFooterElement = document.querySelector(`.footer`);
const footerStatisticsElement = siteFooterElement.querySelector(`.footer__statistics`);

render(footerStatisticsElement, Object(_components_films_count_js__WEBPACK_IMPORTED_MODULE_10__["createFilmsCountTemplate"])(), `beforeend`);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map