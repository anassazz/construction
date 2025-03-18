import express from 'express';
const router = express.Router();
import projectController from '../controllers/projectController.js ';

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);

export default router;