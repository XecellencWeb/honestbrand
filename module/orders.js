import mongoose,{ model  } from "mongoose";

const ordersModel = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    resolved:{
        type:Boolean,
        default:false
    },
    resolvedAt:{
        type:Date,
        default:Date.now()
    },
    userId:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    picture:String,
    orders:{
        type:[Object],
        required:true
    },
    madeAt:{
        type:Date,
        default: Date.now(),
        immutable:true
    },
    totalAmount:{

    },
    totalNumber:{

    }
})

export default model('orders', ordersModel)