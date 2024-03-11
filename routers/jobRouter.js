import { Router } from 'express';
import { addJob, deleteJob, getAllJobs, getJob, updateJob } from '../controllers/jobController.js';

const router = Router();

//Method one
// router.get('/api/v1/jobs', getAllJobs);
// router.post('/api/v1/jobs', addJob);
// router.get('/api/v1/jobs/:jobId', getJob);
// router.patch('/api/v1/jobs/:jobId', updateJob);
// router.delete('/api/v1/jobs/:jobId', deleteJob);

//Method two
router.route('/').get(getAllJobs).post(addJob);
router.route('/:jobId').get(getJob).patch(updateJob).delete(deleteJob);

export default router;
