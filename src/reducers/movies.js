import * as constants from '../constants';

const initialState = {
  isModalOpen: false,
};

const movies = (state = initialState, action) => {
  const { type } = action;

  if (type === constants.OPEN_ADD_MOVIE_MODAL) {
    return Object.assign({}, state, {
      isModalOpen: true,
    });
  } else if (type === constants.CLOSE_ADD_MOVIE_MODAL) {
    return initialState;
  }

  return state;
};

export default movies;
