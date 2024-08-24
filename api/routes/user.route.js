import express from 'express';
import {getUser, updateUser, deleteUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/:id', getUser); // can be used to get details of manager of projects 
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

// router.get('/userProjects', verifyToken, ); // get all the projects of a user 
// router.get('/userDepartment', verifyToken) // get user's department



export default router;