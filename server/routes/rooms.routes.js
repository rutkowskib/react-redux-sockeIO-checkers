/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import * as roomsController from '../controllers/rooms.controller';
import { Router } from 'express';
const router = new Router();

// get routes
router.route('/get').get(roomsController.getRooms);

// post routes
router.route('/new').post(roomsController.createRoom);

// put routes
router.route('/join').put(roomsController.joinRoom);

// delete routes
router.route('/leave').delete(roomsController.leaveRoom);

export default router;
