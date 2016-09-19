/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import React from 'react';
import {Link} from 'react-router';

export function LoginPage(props) {
  const functions = props.functions;
  return(
    <div>
      Login Page
      <input
        placeholder={'username'}
        value={props.state.username}
        onChange={functions.handleChange.bind(this, 'username')}
      />
      <input
        placeholder={'password'}
        value={props.state.password}
        onChange={functions.handleChange.bind(this, 'password')}
      />
      <button onClick={functions.authenticateUser}>Log in</button>
      <Link to="/register/">
        <h2>Dont have account? Sing up</h2>
      </Link>
      {props.children}
    </div>
  );
}

LoginPage.propTypes = {
  functions: React.PropTypes.object,
  state: React.PropTypes.object,
  children: React.PropTypes.object
};
