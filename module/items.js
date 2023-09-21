import mongoose,{ model  } from "mongoose";

const itemsModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    pictures:[String],
    stack:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required:true
    },
    rating:{
        type:[Object],
        default:[]
    },
    liked:{
        type:[Object],
        default:[]
    },
    available:{
        type:Number,
        required:true,
        default: 0
    },
    featured:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default: new Date()
    }
})

export default model('Items', itemsModel)