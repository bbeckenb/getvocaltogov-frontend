import React from 'react';
import UserContext from '../../context/UserContext';
import AuthRoute from './AuthRoute';
import UserProfile from '../User/UserProfile';
import UserLoginForm from '../User/UserLoginForm';
import UserSignUpForm from '../User/UserSignUpForm';
import PostList from '../Post/PostList';
import PostDetails from '../Post/PostDetails';
import PostEditForm from '../Post/PostEditForm';
import TemplateList from '../Template/TemplateList';
import TemplateEditForm from '../Template/TemplateEditForm';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import NavBar from '../Nav/NavBar';

const AppRoutes = function () {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/"><h1>Home</h1></Route>
        <Route exact path="/templates"><TemplateList /></Route>
        <Route exact path="/templates/:templateId/edit"><TemplateEditForm /></Route>
        <Route exact path="/posts"><PostList /></Route>
        <Route exact path="/posts/:postId/details"><PostDetails /></Route>
        <Route exact path="/posts/:postId/edit"><PostEditForm /></Route>
        <Route exact path="/login"><UserLoginForm /></Route>
        <Route exact path="/signup"><UserSignUpForm /></Route>
        {/* <AuthRoute exact path="/profile"><UserProfile /></AuthRoute> */}
        <Route exact path="/profile"><UserProfile /></Route>

        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
