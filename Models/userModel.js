
import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    image:{
       type:String,
       required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accountcreateDate:{
        type:Date,
        default:Date.now,
        required:true
    }
    // isDelted:{
    //     type:Boolean,
    //     default:false
    // },
    // cart:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'cart'
    // }]
},{timestamps:true})

const User=mongoose.model("Users",userSchema);
export default User;