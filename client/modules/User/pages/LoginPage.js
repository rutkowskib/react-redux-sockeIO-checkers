/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import React from 'react';
import LoginInput from '../components/LoginInput';

export default class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: ''
    };
  }

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    return (
      <div>
        Login Page
        <LoginInput
          placeholder={'login'}
          value={this.state.login}
          handleChange={this.handleChange.bind(this, 'login')}
        />
        <LoginInput
          placeholder={'password'}
          value={this.state.password}
          handleChange={this.handleChange.bind(this, 'password')}
        />
        <button>Log in</button>
      </div>
    );
  }
}

