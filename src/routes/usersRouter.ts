import express from 'express';
import { getUser, getUsers, signupUser } from '../controllers/userController';

var router = express.Router();

router.route('/all').get(getUsers);

router.route('/user').get(getUser);

router.route('/signup').post(signupUser);

export default router;
