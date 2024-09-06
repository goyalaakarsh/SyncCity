import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { getTasksByProjectId, createTask, deleteTask, getTask, updateTask } from "../controllers/task.controller.js";

const router = express.Router();

// router.get('/:id', getProjectDetails); // get project details
// router.post('/create', verifyToken, createProject) // create project 
// router.post('/update/:id', verifyToken, updateProject) // update project fields (only fields included in the json would be updated)
// router.post('/delete/:id', verifyToken, deleteProject); // delete a project

// router.get('/:id/members', getProjectMembers) // get project members

router.get("/:id", getTask); // get task details
router.post("/create", createTask); // create task
router.post("/update/:id", updateTask); // update task
router.post("/delete/:id", deleteTask); // delete task
router.get('/', getTasksByProjectId);


export default router;