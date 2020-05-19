import FilterComponent from '../components/filter';
import {FilterType, RenderPosition} from '../const';
import {remove, render, replace} from '../utils/render';
import {getMoviesByFilter} from '../utils/filter.js';
import StatisticsComponent from "../components/statistics";

export default class FilterController {
  constructor(container, moviesModel, pageController) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._pageController = pageController;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;
    this._statisticsComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);

    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTERBEGIN);
    }

    this._statisticsComponent = new StatisticsComponent(this._moviesModel);
    render(this._container, this._statisticsComponent, RenderPosition.BEFOREND);
    this._statisticsComponent.setFilterStatisticsChangeHandler();
    this._statisticsComponent.hide();
    this._statisticsComponent.render();
  }

  _onFilterChange(filterType) {
    if (filterType === `stats`) {
      this._pageController.hide();
      this._statisticsComponent.show();
    } else {
      this._pageController.show();
      this._statisticsComponent.hide();
      this._moviesModel.setFilter(filterType);
      this._activeFilterType = filterType;
    }
  }

  _onDataChange() {
    remove(this._statisticsComponent);
    this.render();
  }
}
