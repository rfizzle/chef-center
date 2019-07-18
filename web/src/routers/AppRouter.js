import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRouter';
import LoginPage from '../containers/LoginPage';
import DashboardPage from '../containers/DashboardPage';
import RegisterPage from '../containers/RegisterPage';
import RootPage from '../containers/RootPage';
import UsersPage from '../containers/UsersPage';
import ProfilePage from '../containers/ProfilePage';
import NodesPage from "../containers/nodes";
import CookbooksPage from "../containers/CookbooksPage";
import RolesPage from "../containers/roles";

const AppRouter = () => (
  <HashRouter>
    <Switch>
      <PrivateRoute path="/" component={RootPage} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage} exact={true}/>
      <PrivateRoute path="/users" component={UsersPage} exact={true}/>
      <PrivateRoute path="/profile" component={ProfilePage} exact={true}/>
      <PrivateRoute path="/nodes" component={NodesPage} exact={true}/>
      <PrivateRoute path="/cookbooks" component={CookbooksPage} exact={true}/>
      <PrivateRoute path="/roles" component={RolesPage} exact={true}/>
      <Route path="/login" component={LoginPage} exact={true}/>
      <Route path="/register" component={RegisterPage} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </HashRouter>
);

export default AppRouter;