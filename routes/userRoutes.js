import express from 'express';
import { registerUser, loginUser,validateTokenUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/validate', validateTokenUser);
export default router;