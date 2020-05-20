import API from "./api";
import ProfileComponent from "./components/profile";
import FilterController from "./controllers/filter";
import FilmsComponent from "./components/films";
import FilmsCountComponent from "./components/films-count";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {RenderPosition} from "./const";
import {render} from "./utils/render";

const AUTHORIZATION = `Basic n834svgsyfe7Fye`;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const api = new API(AUTHORIZATION);
const moviesModel = new MoviesModel();

render(siteFooterElement, new FilmsCountComponent(`130 291`), RenderPosition.BEFOREND);

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREND);

const pageController = new PageController(filmsComponent, moviesModel, api);

// const filterController = new FilterController(siteMainElement, moviesModel, pageController);
// filterController.render();

api.getMovies()
  .then((movies) => {
    moviesModel.setMovies(movies);
    // render(siteHeaderElement, new ProfileComponent(movies), RenderPosition.BEFOREND);
    pageController.render(movies);
  });
