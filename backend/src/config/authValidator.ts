import AppError from "../middleware/AppError";
export interface Input{
    email:string;
    password:string
}

export function validateRegisterInput(body:unknown):Input{
    if(!body|| typeof body!== "object"){
        throw AppError.validation("Invalid request body")
    }
    const {email,password} = body as Record<string,unknown>
    if(typeof email !== "string"||!email.includes("@")){
        throw AppError.validation("Invalid email")
    }
    if(typeof password !== "string"|| password.length <8){
        throw AppError.validation("Password must be atleast 8 characters")
    }
    return {email,password}
}
export function validateLoginInput(body:unknown):Input{
    if(!body ||typeof body !== "object"){
        throw AppError.validation("Invalid request body")

    }
    const {email,password} = body as Record<string,unknown>
   if(typeof email !== "string"||!email.includes("@")){
        throw AppError.validation("Invalid email")
    }
    if(typeof password !== "string"|| password.length === 0){
        throw AppError.validation("Password required")
    }
    return {email,password}
}