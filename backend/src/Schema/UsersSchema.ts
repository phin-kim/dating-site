import { Schema } from 'mongoose';
import { IUser } from '../../backendTypes/Schema';
import { UserConnection } from '../config/DB';
const refreshTokenSchema = new Schema(
    {
        tokenHash: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        expiresAt: { type: Date, required: true },
    },
    { _id: false }
);
const UserSchema = new Schema<IUser>(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        passwordHash: {
            type: String,
            select: false, //never return hah by default
        },
        provider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'moderator'],
            default: 'user',
        },
        refreshTokens: {
            type: [refreshTokenSchema],
            default: [], //strore in an array as user might login from different devices
        },

        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);
export const UserModel = UserConnection.model<IUser>('User', UserSchema);
