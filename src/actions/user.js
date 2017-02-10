import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function getUserProfile(username) {
  return {
    [CALL_API]: {
      types: [
        constants.GET_USER_PROFILE_REQUEST,
        constants.GET_USER_PROFILE_SUCCESS,
        constants.GET_USER_PROFILE_FAILURE,
      ],
      endpoint: `api/user/${username}`,
      method: 'GET',
      schema: Schemas.USER,
    },
  };
}
