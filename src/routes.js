import React from 'react';
import { Route, IndexRoute } from 'react-router';
import MainLayout from './components/Layouts/MainLayout';
import Home from './containers/Home';
import AddMovie from './containers/Movies/AddMovie';

export default (
  <Route path="/" component={MainLayout}>
    <IndexRoute component={Home} />
    <Route path="/movies/add" component={AddMovie} />
  </Route>
);
