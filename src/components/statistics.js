import AbstractSmartComponent from "./abstract-smart-component";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getHistoryMovies} from "../utils/filter";
import {getUserRank} from "../utils/common";
import moment from "moment";

const SECOND = 60;

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
  const allGenres = {};
  // console.log('movies', movies);

  movies.forEach((movie) => {
    movie.allGenres.forEach((genre = ``) => {
      if (allGenres[genre]) {
        allGenres[genre] = allGenres[genre] + 1;
        return;
      }
      allGenres[genre] = 1;
    });
    console.log(moment(movie.watchingDate).fromNow(), new Date());
  });

  return allGenres;
};

const getTopGenre = (genres) => {
  const genresKeys = Object.keys(genres);
  let maxWatchedGenreCount = 0;
  let genre = `-`;

  genresKeys.forEach((genreName) => {
    if (maxWatchedGenreCount < genres[genreName]) {
      maxWatchedGenreCount = genres[genreName];
      genre = genreName;
    }
  });
  return genre;
};

const renderGenreChart = (statisticCtx, movies) => {
  const genres = getGenresAll(getHistoryMovies(movies));

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
          anchor: 'start',
          align: 'start',
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

const createStatisticsTemplate = (movies) => {

  const watchedMovies = getHistoryMovies(movies);
  const countMovies = watchedMovies.length;
  const rank = getUserRank(movies)[0].rank;
  const duration = getTotalDurationStatistics(watchedMovies);
  const {hours, minutes} = duration;
  const genres = getTopGenre(getGenresAll(watchedMovies));

  return (
    `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${rank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
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
        <p class="statistic__item-text">${genres}</p>
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

    this._chart = null;

    this._renderChart();
  }

  getTemplate() {
    return createStatisticsTemplate(this._movies);
  }

  show() {
    super.show();
  }

  rerender() {
    super.rerender();

    this._renderChart();
  }

  _renderChart() {
    const element = this.getElement();
    const statisticCtx = element.querySelector(`.statistic__chart`);

    this._chart = renderGenreChart(statisticCtx, this._movies);
  }
}
