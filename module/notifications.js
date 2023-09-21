import mongoose,{ model  } from "mongoose";

const notificationsModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        required:true,
        unique:true
    },
    stack:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default: new Date()
    }
})

export default model('notifications', notificationsModel)