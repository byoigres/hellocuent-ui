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

export function searchOmdbMovie(criteria) {
  return {
    [CALL_API]: {
      types: [
        constants.SEARCH_OMDB_MOVIE_REQUEST,
        constants.SEARCH_OMDB_MOVIE_SUCCESS,
        constants.SEARCH_OMDB_MOVIE_FAILURE,
      ],
      endpoint: 'api/movies/omdbapi',
      method: 'POST',
      body: {
        criteria,
      },
      schema: Schemas.OMDBMOVIE,
    },
  };
}

export function addMovie(title, year, imdbId, languageCode) {
  return {
    [CALL_API]: {
      types: [
        constants.ADD_MOVIE_REQUEST,
        constants.ADD_MOVIE_SUCCESS,
        constants.ADD_MOVIE_FAILURE,
      ],
      endpoint: 'api/movies/add',
      method: 'POST',
      body: {
        title,
        year,
        imdbId,
        languageCode,
      },
      schema: Schemas.MOVIE,
    },
  };
}

export function getLanguages() {
  return {
    [CALL_API]: {
      types: [
        constants.LANGUAGE_REQUEST,
        constants.LANGUAGE_SUCCESS,
        constants.LANGUAGE_FAILURE,
      ],
      endpoint: 'api/languages',
      method: 'GET',
      schema: Schemas.LANGUAGES,
    },
  };
}
