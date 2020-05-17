import FilterComponent from '../components/filter';
import {FilterType, RenderPosition} from '../const';
import {render, replace} from '../utils/render';
import {getMoviesByFilter} from '../utils/filter.js';

export const MenuItem = {
  MOVIES: `All movies`,
  // WATCHLIST: `Watchlist`,
  // HISTORY: `History`,
  // FAVORITES: `Favorites`,
  STATISTICS: `stats`,
};

export default class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

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
      render(container, this._filterComponent, RenderPosition.BEFOREND);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }

  setOnChange(handler) {
    this._filterComponent.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      const menuItem = evt.target.dataset.filterName;

      const navigationItemElements = this._filterComponent.getElement().querySelectorAll(`a`);

      navigationItemElements.forEach((navigationItem) => {
        navigationItem.classList.remove(`main-navigation__item--active`);
      });

      evt.target.classList.add(`main-navigation__item--active`);

      handler(menuItem);
    });
  }
}
