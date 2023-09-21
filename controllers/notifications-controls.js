import notifications from "../module/notifications.js";
import { sendErr } from "../utils/functions.js";

export const create = async(req,res)=>{
        try {
            const notification = await notifications.create(req.body)
            res.status(200).json(notification)
        } catch (err) {
            sendErr(res,err.status,err.message)
        }
}

export const getAll = async(req,res) =>{
    try {
        const allnotifications = await notifications.find()
        res.status(200).json(allnotifications)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const deleteOne = async(req,res) =>{
    try {
        const notification = await notifications.deleteOne({_id:req.params.id})
        res.status(200).json(notification)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const deleteMany = async(req,res) =>{
    try {
        await notifications.deleteMany({userId:req.params.id})
        res.status(200).json('Delete Sucessfull')
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}