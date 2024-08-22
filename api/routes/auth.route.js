import express from 'express';
import {test, signin, signup, signout} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/test', test);
router.post("/signup", signup);
router.post("/signin", signin);
router.get('/signout', signout);

export default router;