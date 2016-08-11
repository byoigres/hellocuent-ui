import constants from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
});

function languages(state = initialState, action) {
  console.log('languages reducer', state);
  switch (action.type) {
    /*
    case constants.LANGUAGE_SUCCESS:
      break;
    */
    default:
      return state;
  }
}
export default {
  languages,
};
/*
function omdbMoviesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SEARCH_OMDB_MOVIE_REQUEST:
      console.log('SEARCH_OMDB_MOVIE_FAILURE');
      break;
    case SEARCH_OMDB_MOVIE_SUCCESS:
      console.log('SEARCH_OMDB_MOVIE_SUCCESS');
      break;
    case SEARCH_OMDB_MOVIE_FAILURE:
      console.log('SEARCH_OMDB_MOVIE_FAILURE');
      break;
    default:

  }
}
*/
//export default omdbMoviesReducer;
