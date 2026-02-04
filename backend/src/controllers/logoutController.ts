import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../middleware/AppError';
import { UserModel } from '../Schema/UsersSchema';
import { hashToken } from '../utils/jwt';
import 'dotenv/config';
import createLogger from '../utils/logger';
import normalizeError from '../utils/normalizeError';
const log = createLogger('LOGOUT');
export async function logout(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return next(AppError.unauthorized('Missing refresh token'));
        }
        //verify refresh token
        const payload = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET!
        ) as jwt.JwtPayload;
        const userId = payload.uid as string;
        if (!userId) {
            return next(AppError.unauthorized('Invalid refresh token payload'));
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return next(AppError.unauthorized('User not found'));
        }
        const tokenHash = hashToken(refreshToken);
        user.refreshTokens = user.refreshTokens.filter(
            (token) => token.tokenHash !== tokenHash
        );
        await user.save();

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/refresh',
        });
        log.info('user logged out successfully', {
            context: 'logout',
            data: { userId },
        });
        return res.status(200).json({
            success: true,
            message: 'Logged out successfully',
        });
    } catch (error) {
        log.error('Logout failed', {
            context: 'Logout',
            data: normalizeError(error),
        });
        return next(AppError.unauthorized('Invalid refresh token'));
    }
}
