import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router'
import { Switch } from 'react-router-dom';

import MainPage from './main/main_page';
import WrestlerPage from './wrestler/wrestler_container'
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

const App = () => (
  <>
    <NavBarContainer />
    <div id="wrapper">
      <Switch>
        <ProtectedRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/w/:id" component={WrestlerPage}/>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
      </Switch>
    </div>
  </>
);

export default App;