import AppError from '../middleware/AppError';
import createLogger from '../utils/logger.js';
import {
    registerSchema,
    loginSchema,
    type RegisterInput,
    type LoginInput,
} from '../../../src/shared/Schema/validator.js';
const log = createLogger('VALIDATOR');
export interface Input {
    email: string;
    password: string;
}

export function validateRegisterInput(body: unknown): RegisterInput {
    const result = registerSchema.safeParse(body);
    log.info('Results from validator', { context: 'validation', data: result });

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(', ');
        log.error('Error fro zod validator', {
            context: 'ZODERROR',
            data: { message },
        });
        throw AppError.validation(message);
    }

    return result.data;
}
export function validateLoginInput(body: unknown): LoginInput {
    const result = loginSchema.safeParse(body);

    if (!result.success) {
        const message = result.error.issues
            .map((issue) => issue.message)
            .join(', ');
        log.error('Error fro zod validator', {
            context: 'ZODERROR',
            data: { message },
        });
        throw AppError.validation(message);
    }

    return result.data;
}
