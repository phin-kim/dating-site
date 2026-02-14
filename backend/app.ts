

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import createLogger from './src/utils/logger.js';
import errorHandler from './src/middleware/ErrorHandler.js';
import { authRoute } from './src/routes/auth.js';
import { connectDatabases } from './src/config/DB.js';
import normalizeError from './src/utils/normalizeError.js';
const log = createLogger('SERVER');
const app = express();
const cookieSecret = process.env.COOKIE_SECRET;
const PORT = process.env.PORT;

app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    })
);
app.use(express.json());
app.use(cookieParser(cookieSecret));
app.get('/healtchecker', (req, res) => {
    res.json('Heallth checker ');
});
app.use('/api/auth', authRoute);
//connect to all databases before starting server
const startServer = async () => {
    try {
        await connectDatabases();
        app.listen(PORT, () => {
            log.highlight(`Server is runningon http://localhost:${PORT}`, {
                context: 'Runnning server',
            });
        });
    } catch (error) {
        log.error('Failed to connect to databases', {
            context: 'Failed to start',
            data: normalizeError(error),
        });
    }
};
startServer();
app.use(errorHandler);

