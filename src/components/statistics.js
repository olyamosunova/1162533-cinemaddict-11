import AbstractSmartComponent from "./abstract-smart-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getHistoryMovies} from "../utils/filter";
import {getUserRank} from "../utils/common";

const SECOND = 60;

const FILTERS_FOR_STATISTICS = [
  {
    name: `all-time`,
    label: `All time`,
    period: 0,
  },
  {
    name: `today`,
    label: `Today`,
    period: 1,
  },
  {
    name: `week`,
    label: `Week`,
    period: 7,
  },
  {
    name: `month`,
    label: `Month`,
    period: 30,
  },
  {
    name: `year`,
    label: `Year`,
    period: 365,
  },
];

const getTotalDurationStatistics = (movies) => {
  const totalDuration = movies.reduce((result, movie) => {
    const to = movie.duration.search(`h`);
    const from = movie.duration.search(`m`);
    const hour = Number(movie.duration.substring(0, to));
    const minute = Number(movie.duration.substring(to + 1, from));

    return Number(result) + hour * SECOND + minute;
  }, 0);

  const hours = Math.trunc(totalDuration / SECOND);
  const minutes = totalDuration % SECOND;

  return {hours, minutes};
};

const getGenresAll = (movies) => {
  if (movies.length === 0) {
    return movies;
  }

  const allGenres = {};

  movies.forEach((movie) => {
    movie.allGenres.forEach((genre = ``) => {
      if (allGenres[genre]) {
        allGenres[genre] = allGenres[genre] + 1;
        return;
      }
      allGenres[genre] = 1;
    });
  });

  return allGenres;
};

const getTopGenre = (genres) => {
  if (!genres) {
    return false;
  }

  const genresKeys = Object.keys(genres);
  let maxWatchedGenreCount = 0;
  let genre = ``;

  genresKeys.forEach((genreName) => {
    if (maxWatchedGenreCount < genres[genreName]) {
      maxWatchedGenreCount = genres[genreName];
      genre = genreName;
    }
  });
  return genre;
};

const getMoviesForPeriod = (movies, period) => {

  if (period === 0) {
    return movies;
  }

  const periodDate = new Date();
  periodDate.setDate(periodDate.getDate() - period);

  const films = movies.slice().filter((movie) => movie.watchingDate.getTime() >= periodDate.getTime());
  return films;
};

const renderGenreChart = (statisticCtx, movies) => {
  const genres = getGenresAll(movies);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genres),
      datasets: [{
        data: Object.values(genres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

const createFiltersInputMarkup = (activeFilter) => {
  return FILTERS_FOR_STATISTICS.map((filter) => {
    const checked = filter.name === activeFilter;
    return (
      `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.name}" value="${filter.name}" ${checked ? `checked` : ``}>
       <label for="statistic-${filter.name}" class="statistic__filters-label">${filter.label}</label>`
    );
  }).join(`\n`);
};

const createStatisticsTemplate = (movies, filmsForPeriod, activeFilter) => {
  const watchedMovies = getHistoryMovies(filmsForPeriod);
  const countMovies = watchedMovies.length;
  const rank = getUserRank(movies)[0].rank;
  const duration = getTotalDurationStatistics(watchedMovies);
  const {hours, minutes} = duration;
  const genre = getTopGenre(getGenresAll(watchedMovies));
  const filterInput = createFiltersInputMarkup(activeFilter);

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      ${filterInput}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${countMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${genre ? genre : ``}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this._movies = this._moviesModel.getMoviesAll();

    this._activeFilter = FILTERS_FOR_STATISTICS[FILTERS_FOR_STATISTICS
      .findIndex((filter) => filter.name === `all-time`)];

    this._films = getMoviesForPeriod(getHistoryMovies(this._movies), this._activeFilter.period);

    this._chart = null;
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies, this._films, this._activeFilter.name);
  }

  recoveryListeners() {
    this.setFilterStatisticsChangeHandler();
  }

  show() {
    super.show();
  }

  render() {
    this._renderChart();
    this.setFilterStatisticsChangeHandler();
  }

  rerender() {
    super.rerender();

    this._renderChart();
  }

  _renderChart() {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    if (this._films.length !== 0) {
      this._chart = renderGenreChart(statisticCtx, this._films);
    }
  }

  setFilterStatisticsChangeHandler() {
    this.getElement().querySelector(`.statistic__filters`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const statisticsFilterName = evt.target.value;
        const index = FILTERS_FOR_STATISTICS
          .findIndex((filter) => filter.name === statisticsFilterName);
        this._activeFilter = FILTERS_FOR_STATISTICS[index];

        this._films = getMoviesForPeriod(getHistoryMovies(this._movies), this._activeFilter.period);
        this.rerender();
      });
  }
}
