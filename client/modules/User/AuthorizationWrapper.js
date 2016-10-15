/**
 * Created by Bartlomiej Rutkowski on 15.10.16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {authenticateWithToken} from '../User/UserActions';
import CONST from '../../../CONSTANTS/CONSTANTS';
import {moveToMainPage} from '../../util/auth';

export class AuthorizationWrapper extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(CONST.JWT_TOKEN);
    if(token) {
      this.props.authenticateWithToken();
    } else {
      moveToMainPage();
    }
  }

  render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateWithToken: () => dispatch(authenticateWithToken())
  };
}

AuthorizationWrapper.propTypes = {
  authenticateWithToken: React.PropTypes.func,
  children: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationWrapper);
