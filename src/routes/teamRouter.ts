import express from 'express';
import { getTeams } from '../controllers/teamController';
import { authenticateUser } from '../middleware/authJwt';
var router = express.Router();

router.route('/').get(authenticateUser, getTeams);

export default router;
