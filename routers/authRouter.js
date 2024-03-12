import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateUser } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateUser, register);
router.post('/login', login);

export default router;
