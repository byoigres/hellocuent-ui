import React from 'react';
import { render } from 'react-dom';

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';

import routes from './routes';
import App from './containers/App';

const store = configureStore({});

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
