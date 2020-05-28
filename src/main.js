import API from "./api";
import FilterController from "./controllers/filter";
import FilmsComponent from "./components/films";
import FilmsCountComponent from "./components/films-count";
import NoFilmsComponent from "./components/no-films";
import LoadingComponent from "./components/loading";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {RenderPosition} from "./const";
import {render, remove} from "./utils/render";
import SortFilmsComponent from "./components/sort-films";

const AUTHORIZATION = `Basic n8vjdegwrgwrdrsgegcbFye`;
const END_POINT = `https://11.ecmascript.pages.academy/cinemaddict`;

const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREND);

const sortFilmsComponent = new SortFilmsComponent();
render(filmsComponent.getElement(), sortFilmsComponent, RenderPosition.BEFOREBEGIN);

const pageController = new PageController(filmsComponent, moviesModel, api);
const filterController = new FilterController(siteMainElement, moviesModel, pageController);
filterController.render();

const loadingComponent = new LoadingComponent();
render(filmsComponent.getElement().querySelector(`.films-list`), loadingComponent, RenderPosition.BEFOREND);

const filmsCountComponent = new FilmsCountComponent(`0`);
render(siteFooterElement, filmsCountComponent, RenderPosition.BEFOREND);

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    remove(sortFilmsComponent);
    pageController.render(movies);
    remove(loadingComponent);
    remove(filmsCountComponent);
    render(siteFooterElement, new FilmsCountComponent(movies.length), RenderPosition.BEFOREND);
  })
  .catch(() => {
    render(filmsComponent.getElement().querySelector(`.films-list`), new NoFilmsComponent(), RenderPosition.BEFOREND);
  });
