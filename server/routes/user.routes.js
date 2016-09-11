/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import {Router} from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/users/new').post(UserController.saveUser);
router.route('/users/login').post(UserController.authenticateUser);

export default router;
