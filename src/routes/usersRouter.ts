import express from 'express';
import {
  getUser,
  getAllUsers,
  loginUser,
  signupUser,
} from '../controllers/userController';
import { authenticateUser } from '../middleware/authJwt';

var router = express.Router();

router.route('/all').get(authenticateUser, getAllUsers);

router.route('/user/:id').get(authenticateUser, getUser);

router.route('/signup').post(signupUser);

router.route('/login').post(loginUser);

export default router;
