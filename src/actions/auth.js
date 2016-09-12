import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function login(username, password) {
  return {
    [CALL_API]: {
      types: [
        constants.LOGIN_REQUEST,
        constants.LOGIN_SUCCESS,
        constants.LOGIN_FAILURE,
      ],
      endpoint: 'api/auth/login',
      method: 'POST',
      body: {
        username,
        password,
      },
      schema: Schemas.USER,
    },
  };
}
