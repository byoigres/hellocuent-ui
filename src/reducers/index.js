import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import entities from './entities';
import errors from './errors';
import loaders from './loaders';
import translations from './translations';

export default function reducers() {
  return combineReducers({
    routing,
    entities,
    errors,
    loaders,
    translations,
  });
}
