/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import React from 'react';
import {connect} from 'react-redux';
import {RoomsList} from '../components/RoomsList';
import {getRooms} from '../RoomsActions';

export class RoomsContainer extends React.Component {
  componentDidMount() {
    this.props.getRooms();
  }

  render() {
    return(
      <div>
        <RoomsList />
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
    getRooms: () => dispatch(getRooms())
  };
}

RoomsContainer.propTypes = {
  getRooms: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsContainer);
