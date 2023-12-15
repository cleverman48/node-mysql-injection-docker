import express from 'express';
const router = express.Router();

import authenticationController from '../controllers/authController.js';
import dummyController from '../controllers/dummyController.js';

/**
 * (POST Method)
 */
// SignUp
router.post('/signup', authenticationController.signup);

//SignIn
router.post('/signin', authenticationController.signin);
router.post('/generageRandomData', dummyController.creatDummyUsers);

export default router;