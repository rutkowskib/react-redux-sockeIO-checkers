/**
 * Root Component
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from './modules/Intl/IntlWrapper';
import AuthorizationWrapper from './modules/User/AuthorizationWrapper';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./styles/main.scss');

export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <AuthorizationWrapper>
          <Router history={browserHistory}>
            {routes}
          </Router>
        </AuthorizationWrapper>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: React.PropTypes.object.isRequired,
};
