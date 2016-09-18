/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import React from 'react';

export function LoginInput(props) {
  return(
    <input
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.handleChange}
    />
  );
}

LoginInput.propTypes = {
  placeholder: React.PropTypes.string,
  value: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired
};

export default LoginInput;
