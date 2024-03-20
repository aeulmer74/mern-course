import { Router } from 'express';
import { addJob, deleteJob, getAllJobs, getJob, updateJob } from '../controllers/jobController.js';
import { validateJob, validateIdParam } from '../middleware/validationMiddleware.js';
import { checkTestUser } from '../middleware/authMiddleWare.js';
const router = Router();

//Method one
// router.get('/api/v1/jobs', getAllJobs);
// router.post('/api/v1/jobs', addJob);
// router.get('/api/v1/jobs/:jobId', getJob);
// router.patch('/api/v1/jobs/:jobId', updateJob);
// router.delete('/api/v1/jobs/:jobId', deleteJob);

//Method two
router.route('/').get(getAllJobs).post(checkTestUser, validateJob, addJob);
router
	.route('/:jobId')
	.get(validateIdParam, getJob)
	.patch(checkTestUser, validateJob, validateIdParam, updateJob)
	.delete(checkTestUser, validateIdParam, deleteJob);

export default router;
