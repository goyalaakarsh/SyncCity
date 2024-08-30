import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createProject, deleteProject, getProjectDetails, getProjectMembers, getProjects, getProjectTasks, updateProject } from "../controllers/project.controller.js";
const router = express.Router();


router.get('/', getProjects); // get all projects
router.get('/:id', getProjectDetails); // get project details
router.post('/create', verifyToken, createProject) // create project 
router.post('/update/:id', verifyToken, updateProject) // update project fields (only fields included in the json would be updated)
router.post('/delete/:id', verifyToken, deleteProject); // delete a project

router.get('/:id/members', getProjectMembers) // get project members
router.get("/:id/tasks", getProjectTasks); // get all project tasks





export default router;