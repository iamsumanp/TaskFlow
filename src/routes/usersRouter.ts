import express from 'express';
import { getUser, getUsers } from '../controllers/userController';

var router = express.Router();

router.route('/').get(getUsers);

router.route('/user').get(getUser);

export default router;
