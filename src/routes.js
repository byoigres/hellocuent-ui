import React from 'react';
import { Route, IndexRoute } from 'react-router';

import MainLayout from './components/Layouts/MainLayout';
import CleanLayout from './components/Layouts/CleanLayout';
// import Home from './containers/Home';

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import AddMovie from './containers/Movies/AddMovie';
import ListMovies from './containers/Movies/ListMovies';
import MovieDetails from './containers/Movies/MovieDetails';
import AddTranslation from './containers/Movies/AddTranslation';
import NotFound from './containers/Generic/NotFound';

export default (
  <div>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={ListMovies} />
      <Route path="movies">
        <IndexRoute component={ListMovies} />
        <Route path="add" component={AddMovie} />
        <Route path=":movieId" component={MovieDetails} />
        <Route path=":movieId/translation/add" component={AddTranslation} />
      </Route>
    </Route>
    <Route path="/auth" component={CleanLayout}>
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
