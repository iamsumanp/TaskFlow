import express from 'express';
import { getTasks } from '../controllers/taskController';
var router = express.Router();

router.route('/').get(getTasks);

export default router;
