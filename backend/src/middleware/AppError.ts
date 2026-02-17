class AppError extends Error {
    statusCode: number;
    type: string;
    constructor(message: string, statusCode = 500, type = 'Server Error') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message: string) {
        return new AppError(message, 400, 'BadRequest');
    }
    static validation(message: string) {
        return new AppError(message, 400, 'ValidationError');
    }
    static database(message: string) {
        return new AppError(message, 500, 'DatabaseError');
    }
    static unauthorized(message: string) {
        return new AppError(message, 401, 'Unauthorized');
    }
    static notFound(message: string) {
        return new AppError(message, 404, 'NotFound');
    }
    static forbidden(message = 'Forbidden') {
        return new AppError(message, 403, 'Forbidden');
    }
    static conflict(message = 'Conflict') {
        return new AppError(message, 409, 'Conflict');
    }
    static tooManyRequests(message = 'Too many requests') {
        return new AppError(message, 429, 'RateLimitExceeded');
    }
    static invalidToken(message = 'Invalid Token') {
        return new AppError(message, 401, 'InvalidToken');
    }
    static tokenExpired(message = 'Token Expired') {
        return new AppError(message, 401, 'TokenExpired');
    }
    static externalService(message = 'External service error') {
        return new AppError(message, 502, 'BadGateway');
    }
    static serviceUnavalable(message = 'Service unavailable') {
        return new AppError(message, 503, 'ServiceUnavailable');
    }
}
export default AppError;
