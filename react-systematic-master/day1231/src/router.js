import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Vote from './routes/Vote';

const RouterConfig = function RouterConfig({ history }) {
  return <Router history={history}>
    <Switch>
      <Route path="/" component={Vote} />
    </Switch>
  </Router>;
};

export default RouterConfig;