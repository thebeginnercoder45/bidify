import express from 'express';
import { allUsers, becomeSeller, login, logout, register } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/Authenticate.js';

const router = express.Router();

router.get('/all-users', allUsers);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.patch('/upgrade-user/:userId', authenticate, becomeSeller);

export default router;

