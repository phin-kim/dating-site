import type{RequestHandler} from "express"
import AppError from "./AppError"
import type { Role } from "../../backendTypes/authenticate"
import type { AuthenticatedRequest } from "../../backendTypes/authenticate"
export const authorize = (...allowedRoles:Role[]):RequestHandler=>(req,_res,next)=>{
    const user = (req as AuthenticatedRequest).user
    if(!user){
        return next(AppError.unauthorized("not authenticated"))
    }
    if(!allowedRoles.includes(user.role)){
        return next(AppError.forbidden("You donot have permission to accessthis resource"))
    }
    return next()
}