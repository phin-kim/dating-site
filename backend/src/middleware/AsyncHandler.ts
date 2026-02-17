/**
* The problem this solves (why it exists)
In Express:

If a sync route throws → Express catches it ✅
If an async route throws or rejects → Express does NOT catch it ❌
 */
import type { Request, Response, NextFunction, RequestHandler } from 'express';
const asyncHandler =
    <T extends RequestHandler>(fn: T): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
export default asyncHandler;
