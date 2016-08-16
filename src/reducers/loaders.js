import * as constants from '../constants';

const initialState = {
  getMovieLoader: null,
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
    default:
      return state;
  }
};

export default loaders;
