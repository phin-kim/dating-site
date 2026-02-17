import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import type { JWTTokenPayload } from '../../types/authenticate';
import 'dotenv/config';
const accessSecret = process.env.JWT_ACCESS_SECRET;
const refreshSecret = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES_IN = '10min';
const REFRESH_EXPIRES_IN = '7d';
export const hashToken = (token: string): string => {
    return crypto.createHash('sha256').update(token).digest('hex');
};
export function signAccessToken(payload: JWTTokenPayload): string {
    if (!accessSecret) {
        throw new Error('JWT_ACCESS_SECRET not configured');
    }
    return jwt.sign(payload, accessSecret, { expiresIn: ACCESS_EXPIRES_IN });
}
export function signRefreshToken(payload: JWTTokenPayload): string {
    if (!refreshSecret) {
        throw new Error('JWT_REFRESH_SECRET not configured');
    }
    return jwt.sign(payload, refreshSecret, { expiresIn: REFRESH_EXPIRES_IN });
}
/**Why SHA256 is good here:
Very fast
irreversible
common for token hashing
Deterministic (same input → same hash)
Perfect for verifying tokens */
