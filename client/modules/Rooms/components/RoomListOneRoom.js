/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import React from 'react';

export function RoomListOneRoom(props) {
  return(
    <div>
      ROOM
      {props.room.id}
    </div>
  );
}

RoomListOneRoom.propTypes = {
  room: React.PropTypes.object
};
