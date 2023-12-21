import express from 'express';
const router = express.Router();

import authenticationController from '../controllers/authController.js';

/**
 * (POST Method)
 */
// SignUp
router.post('/signup', authenticationController.signup);

//SignIn
router.post('/signin', authenticationController.signin);

export default router;