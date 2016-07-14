import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Layout from './layout/Layout';
import App from './pages/index/Index';


const RouterComp = () => (
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
      <Route path="*" component={() => <div>404 not found</div>}/>
    </Route>
  </Router>
);

export default RouterComp;
