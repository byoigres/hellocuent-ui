import * as constants from '../constants';

const initialState = {
  message: null,
  messages: {},
};

const errors = (state = initialState, action) => {
  const { type, error } = action;

  if (type === constants.RESET_ERROR_MESSAGE) {
    return initialState;
  } else if (error) {
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
