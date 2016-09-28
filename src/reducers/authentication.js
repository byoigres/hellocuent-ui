import * as constants from '../constants';

const initialState = {
  isLogged: false,
  user: null,
};

const authentication = (state = initialState, action) => {
  if (action.type === constants.SET_TOKEN) {
    const { user, token } = action;

    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return Object.assign({}, state, {
      isLogged: true,
      user,
    });
  }
  return state;
};

export default authentication;
