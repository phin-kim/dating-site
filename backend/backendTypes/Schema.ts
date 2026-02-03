import{Document,} from "mongoose"
export interface IUser extends Document{
    email:string
    passwordHash?:string
    provider:"local"|"google"
    role:"user"|"admin"
    isVerified:boolean
    createdAt:Date

} 