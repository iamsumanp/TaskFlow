import express from 'express';
import { getUsers } from '../controllers/userController';

var router = express.Router();

router.route('/').get(getUsers);

export default router;
