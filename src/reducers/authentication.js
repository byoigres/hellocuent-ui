import * as constants from '../constants';

const initialState = {
  isAuthenticated: false,
  register: {
    complete: false,
  },
  user: null,
};

const authentication = (state = initialState, action) => {
  if (action.type === constants.SET_TOKEN) {
    const { user, token } = action;

    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return Object.assign({}, state, {
      isAuthenticated: true,
      user,
    });
  }

  if (action.type === constants.REGISTER_SUCCESS) {
    localStorage.clear();

    return Object.assign({}, state, {
      register: {
        complete: true,
      },
    });
  }

  return state;
};

export default authentication;
