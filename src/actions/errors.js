import * as constants from '../constants';

export function resetErrors() {
  return {
    type: constants.RESET_ERROR_MESSAGE,
  };
}
