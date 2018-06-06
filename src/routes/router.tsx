import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home'

const AppRouter = () => (
  <Switch>
    <Route component={Home} />
  </Switch>
);

export default AppRouter;