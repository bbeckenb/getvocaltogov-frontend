import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import NavBar from '../Nav/NavBar';

const AppRoutes = function ({ loginUser }) {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/"><h1>Home</h1></Route>
        <Route exact path="/posts"><h1>Posts</h1></Route>
        <Route exact path="/login"><h1>login</h1></Route>
        <Route exact path="/signup"><h1>signup</h1></Route>
        <Route exact path="/profile"><h1>profile</h1></Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
