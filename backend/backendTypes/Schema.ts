import { Document } from 'mongoose';
export interface RefreshToken {
    tokenHash: string;
    createdAt: Date;
    expiresAt: Date;
}
export interface IUser extends Document {
    displayName: string;
    email: string;
    passwordHash?: string;
    provider: 'local' | 'google';
    role: 'user' | 'admin';
    isVerified: boolean;
    createdAt: Date;
    refreshTokens: RefreshToken[];
}
