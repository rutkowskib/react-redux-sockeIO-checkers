/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import userMocks from './userMocks';

const mocks = {
  rooms: [{
    id: '123456',
    users: userMocks.users,
    gameInProgress: false
  }, {
    id: '3412412',
    users: userMocks.users,
    gameInProgress: false
  }, {
    id: '124124153',
    users: userMocks.users,
    gameInProgress: false
  }]
};

export default mocks;
