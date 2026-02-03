
import type { Request,Response } from "express";
import {UserModel} from "../Schema/UsersSchema.js"
import AppError from "../middleware/AppError.js";
import { comparePasswords, hashPassword } from "../utils/password.js";
import { signJWT } from "../utils/jwt.js";
import { validateRegisterInput } from "../config/authValidator.js";
export async function register(req:Request,res:Response){
    //validate input
    const {email,password} = validateRegisterInput(req.body)
    //check if user exists
    const existingUser = await UserModel.findOne({email})
    if(existingUser){
        throw AppError.conflict("Email already exists")
    }
    //hash password
    const passwordHash = await hashPassword(password)
    //create user 
    const user = await UserModel.create({
        email,passwordHash,provider:"local"
    })
    //issue jwt
    const token = signJWT({
        uid:user.id,
        email:user.email,
        role:user.role
    })
    res.status(201).json({
        success:true,
        token,
        user:{
            id:user.id,
            email:user.email,
            role:user.role
        }
    })

}
export async function login(req:Request,res:Response){
    const {email,password} = validateRegisterInput(req.body)
    const user = await UserModel.findOne({email}).select("+passwordHash")
    if(!user|| !user.passwordHash){
        throw AppError.unauthorized("Invalid email or password")

    }
    //prevent local login from OAUth-onlu user nb to change this later on toallow both
    if(user.provider !== "local"){
        throw AppError.badRequest("this account uses Google sign-in.Please loginwith Google")
    }
    //compare passwords
    const isMatch = await comparePasswords(password,user.passwordHash)
    if(!isMatch){
        throw AppError.unauthorized("Invalid emailor password");
    }
    //issue jwt
    const token = signJWT({
        uid:user.id,
        email:user.email,
        role:user.role
    })

    res.status(200).json({
        success:true,
        token,
        user:{
            id:user.id,
            email:user.email,
            role:user.role
        }
    })
}