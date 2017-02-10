import { Schema, arrayOf } from 'normalizr';

const user = new Schema('users', { idAttribute: 'username' });
const movie = new Schema('movies');
const translation = new Schema('translations');
const languageTranslation = new Schema('languageTranslation');
const country = new Schema('countries', { idAttribute: 'code' });
const language = new Schema('languages', { idAttribute: 'code' });

movie.define({
  language,
  translations: arrayOf(translation),
  user,
});

translation.define({
  country,
  language,
  languageTranslations: arrayOf(languageTranslation),
});

country.define({
  languages: arrayOf(language),
});

languageTranslation.define({
  language,
});

export const Schemas = {
  MOVIE: movie,
  MOVIES: arrayOf(movie),
  USER: user,
  USERS: arrayOf(user),
  COUNTRY: country,
  COUNTRIES: arrayOf(country),
  LANGUAGE: language,
  LANGUAGES: arrayOf(language),
  TRANSLATION: translation,
  LANGUAGE_TRANSLATION: languageTranslation,
  LANGUAGE_TRANSLATIONS: arrayOf(languageTranslation),
};
