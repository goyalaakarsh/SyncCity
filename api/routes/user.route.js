import express from 'express';
import {getUser, updateUser, deleteUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/:id', getUser); // can be used to get details of manager of projects 
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);

<<<<<<< HEAD
// router.get('/userProjects', verifyToken, ); // get all the projects of a user 
// router.get('/userDepartment', verifyToken) // get user's department



=======
>>>>>>> 9087b147ad1edfedc16cbc3719588a8527be9af4
export default router;