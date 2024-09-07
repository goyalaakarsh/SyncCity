import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createDepartment, deleteDepartment, getDepartment, updateDepartment, getDepartments, joinDepartment } from '../controllers/department.controller.js';

const router = express.Router();

router.get('/:id', getDepartment);
router.get('/', getDepartments);
router.post('/create', verifyToken, createDepartment);
router.post('/update/:id', verifyToken, updateDepartment);
router.delete('/delete/:id', verifyToken, deleteDepartment);
router.post('/join', verifyToken, joinDepartment);

export default router;