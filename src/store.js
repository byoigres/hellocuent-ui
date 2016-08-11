import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './middlewares/api';
import reducers from './reducers';

const middlewaresCreateStore = compose(
  applyMiddleware(thunk, api),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const configureStore = (initialState) => middlewaresCreateStore(
  reducers(initialState),
  initialState
);

export default configureStore;
