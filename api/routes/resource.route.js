import express from 'express';
import { addResource, getAllResources, reduceResource } from '../controllers/resource.controller.js';

const router = express.Router();

router.post('/add', addResource);
router.get('/', getAllResources);
router.post('/reduce', reduceResource);  // New route

export default router;