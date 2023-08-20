import express from 'express';
import { getTasks } from '../controllers/taskController';
import { authenticateUser } from '../middleware/authJwt';
var router = express.Router();

router.route('/').get(authenticateUser, getTasks);

export default router;
