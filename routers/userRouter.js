import { Router } from 'express';
import { getApplicationStats, getCurrentUser, updateUser } from '../controllers/userController.js';
import { validateUpdateUser } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleWare.js';
import upload from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/', getCurrentUser);
router.get('/admin/stats', authorizePermissions('admin'), getApplicationStats);
router.patch('/update-user', upload.single('avatar'), validateUpdateUser, updateUser);
//handles a single file, name from form-data^
export default router;
