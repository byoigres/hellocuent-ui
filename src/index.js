import React from 'react';
import { render } from 'react-dom';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';

import routes from './routes';
import App from './containers/App';

const loadauthenticationData = () => {
  if (localStorage.getItem('token') !== null &&
      localStorage.getItem('user')) {
    return {
      authentication: {
        isAuthenticated: true,
        token: localStorage.getItem('token'),
        user: JSON.parse(localStorage.getItem('user')),
      },
    };
  }

  return {};
};

const store = configureStore(loadauthenticationData());

const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('app');

render(
  <App
    history={syncedHistory}
    store={store}
    routes={routes}
  />,
  rootElement
);
