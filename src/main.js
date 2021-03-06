import API from "./api/index";
import Store from "./api/store.js";
import Provider from "./api/provider";
import FilterController from "./controllers/filter";
import FilmsComponent from "./components/films";
import FilmsCountComponent from "./components/films-count";
import NoFilmsComponent from "./components/no-films";
import LoadingComponent from "./components/loading";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {RenderPosition} from "./const";
import {render, remove} from "./utils/render";

const AUTHORIZATION = `Basic n834dfhdhrGRGye`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const moviesModel = new MoviesModel();

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREND);

const pageController = new PageController(filmsComponent, moviesModel, apiWithProvider);
const filterController = new FilterController(siteMainElement, moviesModel, pageController);
filterController.render();

const loadingComponent = new LoadingComponent();
render(filmsComponent.getElement().querySelector(`.films-list`), loadingComponent, RenderPosition.BEFOREND);

const filmsCountComponent = new FilmsCountComponent(`0`);
render(siteFooterElement, filmsCountComponent, RenderPosition.BEFOREND);

apiWithProvider.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    pageController.render(movies);
    remove(loadingComponent);
    remove(filmsCountComponent);
    render(siteFooterElement, new FilmsCountComponent(movies.length), RenderPosition.BEFOREND);
  })
  .catch(() => {
    remove(loadingComponent);
    render(filmsComponent.getElement().querySelector(`.films-list`), new NoFilmsComponent(), RenderPosition.BEFOREND);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    }).catch(() => {
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title = document.title.concat(` [offline]`);
});
