import jwt  from "jsonwebtoken";
import type { JWTUserPayload } from "../../backendTypes/authenticate";
import "dotenv/config"

const JWT_EXPIRES_IN= "7d"
export function signJWT(payload:JWTUserPayload):string{
    const secret = process.env.JWT_SECRET
    if(!secret){
        throw new Error("JWT_SECRET not configured")
    }
    return jwt.sign(payload,secret,{expiresIn:JWT_EXPIRES_IN})

}