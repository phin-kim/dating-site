import { Router } from 'express';
import asyncHandler from '../middleware/AsyncHandler';
import { register, login } from '../controllers/authController';
import { refresh } from '../controllers/refreshController';
export const authRoute = Router();
authRoute.post('/register', asyncHandler(register));
authRoute.post('/login', asyncHandler(login));
authRoute.post('/refresh', refresh);
