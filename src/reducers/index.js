import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';
import loaders from './loaders';
import translations from './translations';
import authentication from './authentication';
import movies from './movies';

export default function reducers() {
  return combineReducers({
    routing,
    entities,
    errors,
    loaders,
    translations,
    authentication,
    movies,
  });
}
