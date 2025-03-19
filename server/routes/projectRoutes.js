import express from 'express';
const router = express.Router();
import projectController from '../controllers/projectController.js';

router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getProjects);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

export default router;