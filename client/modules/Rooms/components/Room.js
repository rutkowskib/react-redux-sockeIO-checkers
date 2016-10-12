/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import React from 'react';

export function Room(props) {
  return(
    <div>
      ROOM
      {props.room.id}
    </div>
  );
}

Room.propTypes = {
  room: React.PropTypes.object
};
