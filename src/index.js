import React from 'react';
import { render } from 'react-dom';

import { browserHistory } from 'react-router';
import {
  syncHistoryWithStore,
  routerReducer as routing,
} from 'react-router-redux';
import { createStore, combineReducers } from 'redux';
import routes from './routes';

import App from './containers/App';

const store = createStore(combineReducers({
  routing,
}));

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
