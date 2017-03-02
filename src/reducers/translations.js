import * as constants from '../constants';

const initialState = {
  registered: false,
  isModalOpen: false,
};

const translations = (state = initialState, action) => {
  switch (action.type) {
    case constants.INIT_TRANSLATION_PAGE:
      return Object.assign({}, state, {
        registered: '',
      });
    case constants.ADD_TRANSLATION_SUCCESS:
      return Object.assign({}, state, {
        registered: action.response,
      });
    case constants.OPEN_ADD_TRANSLATION_MODAL:
      return Object.assign({}, state, {
        isModalOpen: true,
      });
    case constants.CLOSE_ADD_TRANSLATION_MODAL:
      return Object.assign({}, state, {
        isModalOpen: false,
      });
    default:
      return state;
  }
};

export default translations;
