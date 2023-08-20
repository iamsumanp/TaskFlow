import express from 'express';
import {
  getUser,
  getUsers,
  loginUser,
  signupUser,
} from '../controllers/userController';
import { authenticateUser } from '../middleware/authJwt';

var router = express.Router();

router.route('/all').get(authenticateUser, getUsers);

router.route('/user').get(authenticateUser, getUser);

router.route('/signup').post(signupUser);

router.route('/login').post(loginUser);

export default router;
