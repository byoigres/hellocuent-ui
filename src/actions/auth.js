import * as constants from '../constants';
import 'isomorphic-fetch';
import { Schemas } from '../middlewares/schemas';
import { normalize } from 'normalizr';

function setToken(user, token) {
  return {
    type: constants.SET_TOKEN,
    token,
    user,
  };
}

function loginFailure(response) {
  return {
    type: constants.LOGIN_FAILURE,
    error: response.error || 'Something bad happened',
  };
}

function loginSuccess(user) {
  const normalized = normalize(user, Schemas.USER);

  return {
    type: constants.LOGIN_SUCCESS,
    response: normalized,
  };
}

export function login(username, password) {
  const body = new FormData();
  body.append('username', username);
  body.append('password', password);
  return dispatch => fetch('/api/auth/login', {
    method: 'POST',
    body,
    credentials: 'same-origin',
    headers: {},
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      dispatch(loginFailure(json));
    } else {
      dispatch(setToken(json, response.headers.get('authorization')));
      dispatch(loginSuccess(json));
    }
  });
}

function registerFailure(response) {
  return {
    type: constants.REGISTER_FAILURE,
    error: response.error || 'Something bad happened',
  };
}

function registerSuccess() {
  return {
    type: constants.REGISTER_SUCCESS,
    response: {
      authentication: {
        complete: true,
      },
    },
  };
}

export function register(username, password, confirmPassword) {
  const body = new FormData();

  body.append('username', username);
  body.append('password', password);
  body.append('confirmPassword', confirmPassword);

  return dispatch => fetch('/api/auth/register', {
    method: 'POST',
    body,
    credentials: 'same-origin',
    headers: {},
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      dispatch(registerFailure(json));
    } else {
      dispatch(registerSuccess());
    }
  });
}
