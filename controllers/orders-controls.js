import orders from "../module/orders.js";
import { sendErr } from "../utils/functions.js";

export const createOrder = async(req,res)=>{
        try {
            const order = await orders.create(req.body)
            res.status(200).json(order)
        } catch (err) {
            sendErr(res,err.status,err.message)
        }
}



export const getOrder = async(req,res)=>{
    try {
        const order = await orders.findById(req.params.id)
        res.status(200).json(order)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const getAllOrders = async(req,res) =>{
    try {
        const allorders = await orders.find().sort({madeAt:1})
        res.status(200).json(allorders)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const resolveOrder = async(req,res)=>{
    try {
        await orders.findByIdAndUpdate(req.params.id,{$set:{resolved: true}})
        const allOrders = await orders.find()
        res.status(200).json(allOrders)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const deleteOrder = async(req,res) =>{
    try {
        const order = await orders.deleteOne({_id:req.params.id})
        res.status(200).json(order)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}