import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function getMovies() {
  return {
    [CALL_API]: {
      types: [
        constants.GET_MOVIES_REQUEST,
        constants.GET_MOVIES_SUCCESS,
        constants.GET_MOVIES_FAILURE,
      ],
      endpoint: 'api/movies',
      method: 'GET',
      schema: Schemas.MOVIES,
    },
  };
}

export function getMovie(id) {
  return {
    [CALL_API]: {
      types: [
        constants.GET_MOVIE_REQUEST,
        constants.GET_MOVIE_SUCCESS,
        constants.GET_MOVIE_FAILURE,
      ],
      endpoint: `api/movies/${id}`,
      method: 'GET',
      schema: Schemas.MOVIE,
    },
  };
}

export function requestAddMovie() {
  return {
    type: constants.ADD_MOVIE,
  };
}

export function addMovie(title, year, imdbId, languageCode, poster) {
  return {
    [CALL_API]: {
      types: [
        constants.ADD_MOVIE_REQUEST,
        constants.ADD_MOVIE_SUCCESS,
        constants.ADD_MOVIE_FAILURE,
      ],
      endpoint: 'api/movies',
      method: 'POST',
      body: {
        title,
        year,
        imdbId,
        languageCode,
        poster,
      },
      schema: Schemas.MOVIE,
    },
  };
}

export function openAddMovieModal() {
  return {
    type: constants.OPEN_ADD_MOVIE_MODAL,
  };
}

export function closeAddMovieModal() {
  return {
    type: constants.CLOSE_ADD_MOVIE_MODAL,
  };
}
