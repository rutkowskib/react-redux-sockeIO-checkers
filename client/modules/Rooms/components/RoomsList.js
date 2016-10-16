/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import React from 'react';
import {RoomListOneRoom} from './RoomListOneRoom';
import shortid from 'shortid';

export function RoomsList(props) {
  const rooms = props.rooms.map(room => {
    return(
      <RoomListOneRoom room={room} key={shortid.generate()} />
    );
  });
  return(
    <div>
      {rooms}
    </div>
  );
}

RoomsList.propTypes = {
  rooms: React.PropTypes.array
};
