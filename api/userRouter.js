import * as userService from './service/user'
import express from 'express';
import { userObjectValidator, userIdValidator } from './common/ValidatorMiddleware.js';
const router = express.Router();
router.post('/', userObjectValidator, userService.save);
router.get('/', userService.get);
router.get('/:id', userIdValidator, userService.getById);
router.get('/favourite/movie', userService.getRecommended);
router.put('/:id', userIdValidator, userService.update);
export default router;