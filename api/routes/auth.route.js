import express from 'express';
import {test, login, signup, logout} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/test', test);
router.post("/signup", signup);
router.post("/login", login);
router.get('/logout', logout);

export default router;