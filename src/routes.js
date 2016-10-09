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

const requireAuth = (nextState, replace) => {
  if (localStorage.getItem('token') === null &&
      !localStorage.getItem('user')) {
    replace({
      pathname: '/auth/login',
      state: { nextPathname: nextState.location.pathname },
      query: { redirectTo: nextState.location.pathname },
    });
  }
};

export default (
  <div>
    <Route path="/" component={MainLayout}>
      <IndexRoute component={ListMovies} />
      <Route path="movies">
        <IndexRoute component={ListMovies} />
        <Route path="add" component={AddMovie} onEnter={requireAuth} />
        <Route path=":movieId" component={MovieDetails} />
        <Route path=":movieId/translation/add" component={AddTranslation} onEnter={requireAuth} />
      </Route>
    </Route>
    <Route path="/auth" component={CleanLayout}>
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);
