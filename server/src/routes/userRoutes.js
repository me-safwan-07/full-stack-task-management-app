import express from 'express';
import { body } from 'express-validator';

// Import routes
import { 
    login, 
    register 
} from '../controllers/userController.js';

const router = express.Router();

// POST/api/auth/register
router.post(
    '/register', 
    [
        body('email').isEmail(),
        body('password').isLength({ min: 8 }),
        body('username').isLength({ min: 3 }),
    ], 
    register
);

// POST/api/auth/login
router.post(
    '/login', 
    [
        body('username', "Enter a valid username").exists(),
        body('password', "Password cannot be blank").exists(),
    ], 
    login
);

export default router;