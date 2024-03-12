import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateUser, validateLogin } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/register', validateUser, register);
router.post('/login', validateLogin, login);

export default router;
