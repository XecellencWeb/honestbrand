import trash from "../module/trash.js";
import { sendErr } from "../utils/functions.js";

export const create = async(req,res)=>{
        try {
            const item = await trash.create(req.body)
            res.status(200).json(item)
        } catch (err) {
            sendErr(res,err.status,err.message)
        }
}

export const get = async(req,res)=>{
    try {
        const item = await trash.findById(req.params.id)
        res.status(200).json(item)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const getAll = async(req,res) =>{
    try {
        const alltrash = await trash.find()
        res.status(200).json(alltrash)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const deleteOne = async(req,res) =>{
    try {
        const item = await trash.deleteOne({_id:req.params.id})
        res.status(200).json(item)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}