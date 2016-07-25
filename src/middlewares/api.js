import 'isomorphic-fetch';
import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export const CALL_API = Symbol('Call API');

function callApi(requestInfo = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json',
  },
}, schema) {
  const { endpoint, method, body, headers } = requestInfo;
  const fullUrl = ` /${endpoint}`;

  const options = {
    method,
    headers,
    credentials: 'same-origin',
  };

  if (body) {
    if (method === 'POST') {
      const data = new FormData();

      for (const key in body) {
        if (body.hasOwnProperty(key)) {
          data.append(key, body[key]);
        }
      }

      options.body = data;
    } else {
      options.body = JSON.stringify(body);
    }
  }

  return fetch(fullUrl, options).then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      if (schema) {
        const normalized = normalize(json, schema);
        return Object.assign({}, normalized);
      }

      return json;
    });
}

export default () => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const {
    endpoint,
    method,
    body,
    headers,
    types,
    schema,
  } = callAPI;

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi({
    endpoint,
    method,
    body,
    headers,
  }, schema).then(
    response => next(actionWith({
      response,
      type: successType,
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened',
    }))
  );
};
