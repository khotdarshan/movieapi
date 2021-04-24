import * as authService from './service/auth';
import express from 'express';
import { userObjectValidator } from './common/ValidatorMiddleware.js';
const router = express.Router();
router.post('/login', userObjectValidator, authService.login);
router.delete('/logout', authService.logout);
export default router;