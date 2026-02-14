import mongoose from "mongoose"
import type{Request,Response,NextFunction} from "express"
import AppError from "./AppError.js"
import {MongoServerError} from "mongodb"
import type { ErrorType } from "../../backendTypes/ErrorHandler.js"

import crypto from "node:crypto"

const errorHandler=(err:ErrorType,
    req:Request,
    res:Response,
    _next:NextFunction)=>{
        const isProd = process.env.NODE_ENV=== "production"//not to return generic errors in prod
        const requestId = req.headers['x-request-id'] ?? crypto.randomUUID()
        const stack = err instanceof Error?err.stack:undefined
    console.error('🔥 Caught in Error Handler', {requestId,message:err.message,stack:stack})
    let appError:AppError
    if(err instanceof AppError){
        appError=err
    }
    else if(err instanceof mongoose.Error.ValidationError){
        const detail = Object.values(err.errors).map((er)=>er.message).join(", ")
        appError = AppError.validation(`Validation Failed ${detail}`)
    }else if(err instanceof mongoose.Error.CastError){
        appError=AppError.badRequest(`Invalid value for ${err.path}`)
    } else if(err instanceof MongoServerError && err.code ===11000){
        const field = Object.keys(err.keyValue)[0]
        appError = AppError.conflict(`${field} already exists`)

    }else if(err instanceof MongoServerError){
        appError = AppError.database("Database Error")
    }else {
        appError = AppError.database("Internal server error")
    }
    const statusCode = appError.statusCode ||500
    const message=isProd?"Something went wrong" :appError.message
    const type= appError.type||"Server Error"
    return res.status(appError.statusCode).json({
        success:false,
        requestId,
        error:{
            message,type,statusCode
        }
    })

}
export default errorHandler