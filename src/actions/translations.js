import { CALL_API } from '../middlewares/api';
import { Schemas } from '../middlewares/schemas';
import * as constants from '../constants';

export function initTranslation() {
  return {
    type: constants.INIT_TRANSLATION_PAGE,
  };
}

export function getTranslation(id) {
  return {
    [CALL_API]: {
      types: [
        constants.GET_TRANSLATION_REQUEST,
        constants.GET_TRANSLATION_SUCCESS,
        constants.GET_TRANSLATION_FAILURE,
      ],
      endpoint: `api/translation/${id}`,
      method: 'GET',
      schema: Schemas.TRANSLATION,
    },
  };
}

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

export function addLanguageTranlation(translationId, title) {
  return {
    [CALL_API]: {
      types: [
        constants.ADD_LANGUAGE_TRANSLATION_REQUEST,
        constants.ADD_LANGUAGE_TRANSLATION_SUCCESS,
        constants.ADD_LANGUAGE_TRANSLATION_FAILURE,
      ],
      endpoint: 'api/translation/language',
      method: 'POST',
      body: {
        translationId,
        title,
      },
      schema: Schemas.LANGUAGE_TRANSLATION,
    },
  };
}

export function openAddTranslationModal() {
  return {
    type: constants.OPEN_ADD_TRANSLATION_MODAL,
  };
}

export function closeAddTranslationModal() {
  return {
    type: constants.CLOSE_ADD_TRANSLATION_MODAL,
  };
}
