import * as constants from '../constants';

const initialState = {
  message: null,
  messages: {},
};

const errors = (state = initialState, action) => {
  const { type, error } = action;
  // console.log('action', action);

  if (type === constants.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    // console.log('An error had happened', JSON.stringify(error, null, 2));
    // console.log('An error had happened', error);

    if (error.message) {
      return Object.assign({}, state, {
        message: error.message,
      });
    } else if (error.messages) {
      return Object.assign({}, state, {
        messages: error.messages,
      });
    }
  }

  return state;
};

export default errors;
