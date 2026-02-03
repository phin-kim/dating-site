import mongoose,{Schema} from "mongoose"
import { IUser } from "../../backendTypes/Schema"
const UserSchema = new Schema<IUser>({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    passwordHash:{
        type:String,
        select:false,//never return hah by default
        
    },
    provider:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    role:{
        type:String,
        enum:["user","admin","moderator"],
        default:"user"
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
export  const UserModel = mongoose.model<IUser>("User",UserSchema);