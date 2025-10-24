import { model, Schema } from "mongoose";
import { IUser } from "../interface/iterface";

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
      },
      role:{
        type:String,
        enum:["admin","user"],
        default:"user"
      }
},
{timestamps:true}
);

const User = model<IUser>("User",userSchema);
export default User