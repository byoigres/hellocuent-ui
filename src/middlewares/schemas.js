import { Schema, arrayOf } from 'normalizr';

const user = new Schema('users');
const movie = new Schema('movies');
const omdbMovie = new Schema('omdbMovie');
const translation = new Schema('translations');
const innerTranslation = new Schema('innerTranslation');
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
  innerTranslations: arrayOf(innerTranslation),
});

country.define({
  languages: arrayOf(language),
});

innerTranslation.define({
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
  INNERTRANSLATION: innerTranslation,
  INNERTRANSLATIONS: arrayOf(innerTranslation),
  OMDBMOVIE: omdbMovie,
};
