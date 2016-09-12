import { CALL_API } from '../middlewares/api';
// import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function addTranslation(
  movieId,
  title,
  countryCode,
  languageCode,
  description) {
  return {
    [CALL_API]: {
      types: [
        constants.ADD_TRANSLATION_REQUEST,
        constants.ADD_TRANSLATION_SUCCESS,
        constants.ADD_TRANSLATION_FAILURE,
      ],
      endpoint: 'api/translation',
      method: 'POST',
      body: {
        movieId,
        title,
        countryCode,
        languageCode,
        description,
      },
    },
  };
}
