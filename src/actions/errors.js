import * as constants from '../constants';

export default function resetErrors() {
  return {
    type: constants.RESET_ERROR_MESSAGE,
  };
}
