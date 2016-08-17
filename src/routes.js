import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './components/Layouts/MainLayout';
import Home from './containers/Home';

import AddMovie from './containers/Movies/AddMovie';
import ListMovies from './containers/Movies/ListMovies';
import MovieDetails from './containers/Movies/MovieDetails';
import AddTranslation from './containers/Movies/AddTranslation';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Home} />
    <Route path="/movies" component={ListMovies} />
    <Route path="/movies/add" component={AddMovie} />
    <Route path="/movies/:movieId" component={MovieDetails} />
    <Route path="/movies/:movieId/translation/add" component={AddTranslation} />
  </Route>
);
