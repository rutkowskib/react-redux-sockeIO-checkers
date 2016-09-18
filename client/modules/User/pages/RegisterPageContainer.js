/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import React from 'react';
import {connect} from 'react-redux';
import RegisterPage from '../components/RegisterPage';
import {registerUser} from '../UserActions';

export class RegisterPageContainer extends React.Component {
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
      registerUser: this.props.registerUser.bind(this, this.state)
    };
    return(
      <RegisterPage
        functions={functions}
        state={this.state}
      />
    );
  }
}

RegisterPageContainer.propTypes = {
  registerUser: React.PropTypes.func
};

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: user => dispatch(registerUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
