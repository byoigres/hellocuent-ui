import { fromJS } from 'immutable';

const initialState = fromJS({
  loading: false,
});

function languages(state = initialState, action) {
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
