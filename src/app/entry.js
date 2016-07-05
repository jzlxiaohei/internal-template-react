import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './Layout';
import App from './pages/index/index';
render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={App}/>
      <Route path="*" component={()=><div>404 not found</div>}/>
    </Route>
  </Router>
), document.getElementById('root'));
