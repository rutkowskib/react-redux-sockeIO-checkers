/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import * as roomsController from '../controllers/rooms.controller';
import { Router } from 'express';
const router = new Router();

router.route('/rooms/new').post(roomsController.createRoom);
router.route('/rooms/leave').delete(roomsController.leaveRoom);
router.route('/rooms/join').put(roomsController.joinRoom);
router.route('/rooms/get').get(roomsController.getRooms);

export default router;
