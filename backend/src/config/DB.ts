import mongoose from 'mongoose';
import createLogger from '../utils/logger.js';
import normalizeError from '../utils/normalizeError.js';
const log = createLogger('CONFIG:DB');
const isProd = process.env.NODE_ENV === 'production';
const USERS = isProd
    ? process.env.USER_MONGO_URI ||
      (() => {
          throw new Error('Missing USER_MONGO_URI in production');
      })()
    : 'mongodb://127.0.0.1:27017/LCUserDatabase';
export const UserConnection = mongoose.createConnection(USERS);
export const connectDatabases = async (): Promise<void> => {
    try {
        await Promise.all([UserConnection.asPromise()]);
        log.highlight('All databases are connected', { context: 'database' });
    } catch (error) {
        log.error('Failure to connect to database', {
            context: 'Database failure',
            data: normalizeError(error),
        });
    }
};
