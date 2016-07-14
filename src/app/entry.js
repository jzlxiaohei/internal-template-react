import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Router from './Router';

const rootEl = document.getElementById('root');
render(
  <AppContainer>
    <Router/>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./Router', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    /* eslint global-require: 0 */
    const NextRouter = require('./Router').default;
    render(
      <AppContainer>
        <NextRouter/>
      </AppContainer>,
      rootEl
    );
  });
}
