import { Schema, arrayOf } from 'normalizr';

const user = new Schema('users');
const movie = new Schema('movies');
const omdbMovie = new Schema('omdbMovie');
const translation = new Schema('translations');
const country = new Schema('countries', { idAttribute: 'code' });
const language = new Schema('languages', { idAttribute: 'code' });

movie.define({
  language,
  translations: arrayOf(translation),
});

translation.define({
  country,
  language,
});

country.define({
  languages: arrayOf(language),
});

export const Schemas = {
  MOVIE: movie,
  MOVIES: arrayOf(movie),
  USER: user,
  COUNTRY: country,
  COUNTRIES: arrayOf(country),
  LANGUAGE: language,
  LANGUAGES: arrayOf(language),
  TRANSLATION: translation,
  OMDBMOVIE: omdbMovie,
};
