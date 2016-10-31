import * as constants from '../constants';

const initialState = {
  getMovieLoader: null,
  languageTranslation: null,
};

const loaders = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_MOVIE_REQUEST:
      return Object.assign({}, state, {
        getMovieLoader: false,
      });
    case constants.GET_MOVIE_SUCCESS:
      return Object.assign({}, state, {
        getMovieLoader: true,
      });
    // Language Translation
    case constants.ADD_LANGUAGE_TRANSLATION_REQUEST:
      return Object.assign({}, state, {
        languageTranslation: true,
      });
    case constants.ADD_LANGUAGE_TRANSLATION_SUCCESS:
    case constants.ADD_LANGUAGE_TRANSLATION_FAILURE:
      return Object.assign({}, state, {
        languageTranslation: false,
      });
    default:
      return state;
  }
};

export default loaders;
