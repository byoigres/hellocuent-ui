import merge from 'lodash/fp/merge';

const initialState = {
  languages: {},
  movies: {},
};

function mergeEntities(state, entities) {
  return merge(entities, state, {});
}

const entities = (state = initialState, action) => {
  if (action.response && action.response.entities) {
    return mergeEntities(action.response.entities, state);
  }

  return state;
};

export default entities;
