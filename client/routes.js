/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/User/pages/LoginPageContainer');
  require('./modules/User/pages/RegisterPageContainer');
  require('./modules/Rooms/pages/RoomsContainer');
  require('./modules/Rooms/pages/RoomContainer');
}

// pages
import RoomsContainer from './modules/Rooms/pages/RoomsContainer';
import RoomContainer from './modules/Rooms/pages/RoomContainer';

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/LoginPageContainer').default);
        });
      }}
    />
    <Route
      path="/register/"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/RegisterPageContainer').default);
        });
      }}
    />
    <Route path="/rooms/" component={RoomsContainer} />
    <Route path="/room/:roomId" component={RoomContainer} />
  </Route>
);
