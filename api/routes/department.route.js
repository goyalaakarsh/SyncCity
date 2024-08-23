import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createDepartment, deleteDepartment, getDepartment, updateDepartment } from '../controllers/department.controller.js';

const router = express.Router();

router.get('/:id', getDepartment )
router.post('/create', verifyToken, createDepartment);
router.post('/update/:id', verifyToken, updateDepartment);
router.post('/delete/:id', verifyToken, deleteDepartment);

export default router;