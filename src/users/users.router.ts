import { Router } from 'express';
import { createUser } from './users.controller';
import { loginUser } from './users.controller';

const router = Router();

// Route to create a user
router.post('/users', createUser);

// Route to login a user
router.post('/users/login', loginUser);

export default router;