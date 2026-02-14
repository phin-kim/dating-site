import type { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';
import { UserModel } from '../Schema/UsersSchema.js';
import AppError from '../middleware/AppError.js';
import { hashToken, signAccessToken, signRefreshToken } from '../utils/jwt.js';
import createLogger from '../utils/logger.js';
import normalizeError from '../utils/normalizeError.js';

const log = createLogger('AUTH CONTROLLER');

export async function refresh(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.signedCookies?.refreshToken;
        if (!token) {
            return next(AppError.unauthorized('Missing refresh token'));
        }
        const payload = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET!
        ) as JwtPayload;
        //extract userId safely
        const userId = payload.uid as string;
        if (!userId) {
            return next(AppError.unauthorized('Invalid refresh token payload'));
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return next(AppError.unauthorized('User not found'));
        }
        if (!user) {
            return next(AppError.unauthorized('User not found'));
        }
        //verificatoin f hashed token from the db
        const tokenHash = hashToken(token);
        const stored = user.refreshTokens.find(
            (token) => token.tokenHash === tokenHash
        );
        if (!stored) {
            return next(AppError.unauthorized('Refresh token revoked'));
        }
        //rotation happens
        user.refreshTokens = user.refreshTokens.filter(
            (token) => token.tokenHash !== tokenHash
        );
        //create anew refresh token
        const newRefreshToken = signRefreshToken({
            uid: user._id.toString(),
            role: user.role,
        });
        const newRefreshHashedToken = hashToken(newRefreshToken);
        //save new hashed refresh token
        user.refreshTokens.push({
            tokenHash: newRefreshHashedToken,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        await user.save();
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            signed: true,
        });
        //send newaccess token
        const newAccessToken = signAccessToken({
            uid: user._id.toString(),
            role: user.role,
        });
        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error: unknown) {
        log.error('Error in the refresh token', {
            context: 'refresh token',
            data: normalizeError(error),
        });
        return next(AppError.unauthorized('Invalid refresh token'));
    }
}
