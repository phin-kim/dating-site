import type{RequestHandler} from "express"
import AppError from "./AppError.js"
import jwt from "jsonwebtoken"
import { JWTUserPayload,AuthenticatedRequest } from "../../backendTypes/authenticate.js"
import "dotenv/config"
import createLogger from "../utils/logger.js"
const log = createLogger("AUTHENTICATE")
const authenticate:RequestHandler=async(req,_res,next)=>{
    const requestIdHeader = req.headers["x-request-id"];
    const requestId = Array.isArray(requestIdHeader) ? requestIdHeader[0] : requestIdHeader;
        log.highlight("=== AUTHENTICATE MIDDLEWARE DEBUG START ===", { requestId, context: "authenticate" });
        log.debug("Request method", { requestId, context: "authenticate", data: { method: req.method, url: req.url } });
        log.debug("Request body", { requestId, context: "authenticate", data: req.body });
        log.debug("Content-Type", { requestId, context: "authenticate", data: { contentType: req.headers["content-type"] } });


    try {
        
        const authHeader = req.headers.authorization||""
        let token:string|undefined= authHeader && authHeader.startsWith("Bearer ")?authHeader.split(" ")[1]:undefined

        log.debug("Token from header", { requestId, context: "authenticate", data: { token: token ? `${token.slice(0, 30)}...` : "undefined" } });


        if(!token && req.body?.idToken){
            token = req.body.idToken
            log.debug("Token from body", { requestId, context: "authenticate", data: { token: token ? `${token.slice(0, 30)}...` : "undefined" } });
        }
        if(!token){
            throw AppError.unauthorized("Unauthorized user")
        }
        //verufy JWT
        const secret= process.env.JWT_SECRET
        if(!secret){
            throw new Error("JWT_SECRET not configured")
        }
        const decoded = jwt.verify(token,secret)as JWTUserPayload;
         log.debug("Decoded token", { requestId, context: "authenticate", data: decoded });

        //attach user to request
        (req as AuthenticatedRequest).user = decoded
        log.highlight("=== AUTHENTICATE MIDDLEWARE DEBUG END ===", { requestId, context: "authenticate" });
    return next();
    } catch (err: unknown) {
  const error = err instanceof Error ? err : new Error(String(err));
  log.error("Authentication middleware error", {
    requestId,
    context: "authenticate",
    data: { message: error.message, stack: error.stack }
  });

  if (error instanceof AppError) return next(error);
  return next(AppError.unauthorized("Invalid or expired token"));
}

}
export default authenticate