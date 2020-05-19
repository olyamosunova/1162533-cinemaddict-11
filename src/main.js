import ProfileComponent from "./components/profile";
import FilterController from "./controllers/filter";
import FilmsComponent from "./components/films";
import FilmsCountComponent from "./components/films-count";
import PageController from "./controllers/page-controller";
import MoviesModel from "./models/movies";
import {generateFilms} from "./mock/film";
import {RenderPosition} from "./const";
import {render} from "./utils/render";

const CARD_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(CARD_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

render(siteHeaderElement, new ProfileComponent(films), RenderPosition.BEFOREND);
render(siteFooterElement, new FilmsCountComponent(`130 291`), RenderPosition.BEFOREND);

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREND);

const pageController = new PageController(filmsComponent, moviesModel);
pageController.render(films);

const filterController = new FilterController(siteMainElement, moviesModel, pageController);
filterController.render();
