/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import React from 'react';

export default function RegisterPage(props) {
  const state = props.state;
  const functions = props.functions;
  return (
    <div className="registerPage">
      <h1>Sign Up!</h1>
      <div className="inputsContainer">
        <input
          placeholder="username"
          value={state.username}
          onChange={functions.handleChange.bind(this, 'username')}
        />
        <input
          placeholder="password"
          value={state.password}
          onChange={functions.handleChange.bind(this, 'password')}
        />
        <button onClick={functions.registerUser}>Sign in</button>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  state: React.PropTypes.object,
  functions: React.PropTypes.object
};
