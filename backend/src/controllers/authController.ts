import type { Request, Response } from 'express';
import 'dotenv/config';
import { UserModel } from '../Schema/UsersSchema.js';
import AppError from '../middleware/AppError.js';
import { comparePasswords, hashPassword } from '../utils/password.js';
import { hashToken, signAccessToken, signRefreshToken } from '../utils/jwt.js';
import {
    validateLoginInput,
    validateRegisterInput,
} from '../config/authValidator.js';
export async function register(req: Request, res: Response) {
    //validate input
    const { displayName, email, password } = validateRegisterInput(req.body);
    //check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw AppError.conflict('Email already exists');
    }
    //hash password
    const passwordHash = await hashPassword(password);
    //create user
    const user = await UserModel.create({
        displayName,
        email,
        passwordHash,
        provider: 'local',
    });
    //issue jwt
    const accessToken = signAccessToken({
        uid: user._id.toString(),
        role: user.role,
    });
    const refreshToken = signRefreshToken({
        uid: user._id.toString(),
        role: user.role,
    });
    const refreshTokenHash = hashToken(refreshToken);
    user.refreshTokens.push({
        tokenHash: refreshTokenHash,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();
    //setrefresh token on cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/auth/refresh',
        sameSite: 'strict',
        signed: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
        success: true,
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            role: user.role,
        },
    });
}
export async function login(req: Request, res: Response) {
    const { email, password } = validateLoginInput(req.body);
    const user = await UserModel.findOne({ email }).select('+passwordHash');
    if (!user || !user.passwordHash) {
        throw AppError.unauthorized('Invalid email or password');
    }
    //prevent local login from OAUth-onlu user nb to change this later on toallow both
    if (user.provider !== 'local') {
        throw AppError.badRequest(
            'This account uses Google sign-in.Please loginwith Google'
        );
    }
    //compare passwords
    const isMatch = await comparePasswords(password, user.passwordHash);
    if (!isMatch) {
        throw AppError.unauthorized('Invalid email or password');
    }
    //issue jwt
    const accessToken = signAccessToken({
        uid: user._id.toString(),
        role: user.role,
    });
    const refreshToken = signRefreshToken({
        uid: user._id.toString(),
        role: user.role,
    });
    const refreshTokenHash = hashToken(refreshToken);
    user.refreshTokens.push({
        tokenHash: refreshTokenHash,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await user.save();
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, //js cannot access it
        secure: process.env.NODE_ENV === 'production', //HTTPS only in production
        sameSite: 'strict', // prevents CSRF
        path: '/auth/refresh',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        signed: true,
    });
    //refreshtokens must be protected from XSS attacks

    res.status(200).json({
        success: true,
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
        },
    });
}
