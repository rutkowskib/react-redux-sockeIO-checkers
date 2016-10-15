/**
 * Created by Bartlomiej Rutkowski on 15.10.16.
 */
import React from 'react';
import {connect} from 'react-redux';

class RoomContainer extends React.Component {
  componentWillMount() {

  }

  render() {
    return(
      <div>
        ONE ROOM
      </div>
    );
  }
}

function mapStateToProps() {
  return {

  };
}

function mapDispatchToProps() {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);
