/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {LoginPage} from '../components/LoginPage';
import {authenticateUser} from '../UserActions';

export class LoginPageContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = (field, event) => {
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    const functions = {
      handleChange: this.handleChange,
      authenticateUser: this.props.authenticateUser.bind(this, this.state)
    };
    return (
      <div>
        <LoginPage
          state={this.state}
          functions={functions}
        />
      </div>
    );
  }
}

LoginPageContainer.propTypes = {
  authenticateUser: React.PropTypes.func
};

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateUser: user => dispatch(authenticateUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer);
