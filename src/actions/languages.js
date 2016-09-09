import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function getLanguagesByCountry(code) {
  return {
    [CALL_API]: {
      types: [
        constants.GET_LANGUAGES_BY_COUNTRY_REQUEST,
        constants.GET_LANGUAGES_BY_COUNTRY_SUCCESS,
        constants.GET_LANGUAGES_BY_COUNTRY_FAILURE,
      ],
      endpoint: `api/languages/country/${code}`,
      method: 'GET',
      schema: Schemas.LANGUAGES,
    },
  };
}
