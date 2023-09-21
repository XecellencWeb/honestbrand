import mongoose,{ model  } from "mongoose";

const trashModel = new mongoose.Schema({
    itemId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    pictures:[String],
    stack:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:true,
    },
    featured:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    rating:{
        type:[Number],
        default:[]
    },
    available:{
        type:Number,
        required:true,
        default: 0
    },
    createdAt: {
        type:Date,
        default: new Date()
    }
})

export default model('trash', trashModel)