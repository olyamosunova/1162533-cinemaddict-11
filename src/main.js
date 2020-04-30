import ProfileComponent from "./components/profile";
import FilterComponent from "./components/filter";
import FilmsComponent from "./components/films";
import FilmsCountComponent from "./components/films-count";
import PageController from "./controllers/page-controller";
import {generateFilms} from "./mock/film";
import {generateFilters} from "./mock/filter";
import {getUserRank} from "./mock/profile";
import {RenderPosition} from "./const";
import {render} from "./utils/render";

const CARD_COUNT = 20;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

const films = generateFilms(CARD_COUNT);
const filters = generateFilters(films);
const userRank = getUserRank(filters);

render(siteHeaderElement, new ProfileComponent(userRank), RenderPosition.BEFOREND);
render(siteMainElement, new FilterComponent(filters), RenderPosition.BEFOREND);
render(siteFooterElement, new FilmsCountComponent(`130 291`), RenderPosition.BEFOREND);

const filmsComponent = new FilmsComponent();
render(siteMainElement, filmsComponent, RenderPosition.BEFOREND);

const pageController = new PageController(filmsComponent);

pageController.render(films);
