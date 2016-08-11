import { Schema, arrayOf } from 'normalizr';

const user = new Schema('users');
const movie = new Schema('movies');
const omdbMovie = new Schema('omdbMovie');
const translation = new Schema('translations');
const country = new Schema('countries');
const language = new Schema('languages', { idAttribute: 'code' });

translation.define({
  movie: {},
  country: {},
});

language.define();

export const Schemas = {
  MOVIE: movie,
  USER: user,
  COUNTRY: country,
  LANGUAGE: language,
  LANGUAGES: arrayOf(language),
  TRANSLATION: translation,
  OMDBMOVIE: omdbMovie,
};
