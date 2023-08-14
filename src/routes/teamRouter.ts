import express from 'express';
import { getTeams } from '../controllers/teamController';
var router = express.Router();

router.route('/').get(getTeams);

export default router;
