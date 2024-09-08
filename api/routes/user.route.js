import express from 'express';
import {getAdmins, getUser, updateUser, deleteUser, assignProjectToUsers, getUserWithId} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/admins', getAdmins);
router.get('/:id', getUserWithId);
router.get('/', verifyToken, getUser); // can be used to get details of manager of projects 
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

router.post('/assignProject', verifyToken, assignProjectToUsers);
// router.get('/userProjects', verifyToken, ); // get all the projects of a user 
// router.get('/userDepartment', verifyToken) // get user's department



export default router;