/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import * as roomsController from '../controllers/rooms.controller';
import { Router } from 'express';
const router = new Router();

// get routes
router.route('/rooms/get').get(roomsController.getRooms);

// post routes
router.route('/rooms/new').post(roomsController.createRoom);

// put routes
router.route('/rooms/join').put(roomsController.joinRoom);

// delete routes
router.route('/rooms/leave').delete(roomsController.leaveRoom);

export default router;
