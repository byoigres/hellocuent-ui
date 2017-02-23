import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export default function getCountries() {
  return {
    [CALL_API]: {
      types: [
        constants.GET_COUNTRIES_REQUEST,
        constants.GET_COUNTRIES_SUCCESS,
        constants.GET_COUNTRIES_FAILURE,
      ],
      endpoint: 'api/countries',
      method: 'GET',
      schema: Schemas.COUNTRIES,
    },
  };
}
