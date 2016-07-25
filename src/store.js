import { routerReducer as routing } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './middlewares/api';

const middlewaresCreateStore = compose(
  applyMiddleware(thunk, api),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const configureStore = (initialState) => middlewaresCreateStore(
  combineReducers({
    routing,
    languages: (state = []) => {
      console.group('languages reducer');
      console.log('state', state);
      console.groupEnd('languages reducer');
      return state;
    },
  }),
  initialState
);

export default configureStore;
