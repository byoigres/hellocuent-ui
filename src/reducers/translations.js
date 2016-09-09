import * as constants from '../constants';

const initialState = {
  registered: false,
};

const translations = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_TRANSLATION_SUCCESS:
      return Object.assign({}, state, {
        registered: action.response,
      });
    default:
      return state;
  }
};

export default translations;