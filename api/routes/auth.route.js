import express from 'express';
import {login, signup, logout, google} from '../controllers/auth.controller.js';

const router = express.Router();

// router.get('/test', test); can be removed
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/google", google);

export default router;