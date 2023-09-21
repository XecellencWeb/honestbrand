import mongoose,{ model  } from "mongoose";

const userModel = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        unique:true
    },
    picture:String,
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    isBoss:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    verified:{
        type:Boolean,
        default: false
    },
    pendingGoods:[String],
    createdAt:{ 
        type:Date,
        default: new Date()
    }
})

export default model('Users', userModel)