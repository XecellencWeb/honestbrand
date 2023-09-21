import items from "../module/items.js";
import { sendErr } from "../utils/functions.js";

export const createItem = async(req,res)=>{
        try {
            const exist = await items.findOne({name:req.body.name})
            if(exist) return sendErr(res,401,'Name must be Unique')
            const item = await items.create(req.body)
            res.status(200).json(item)
        } catch (err) {
            sendErr(res,err.status,err.message)
        }
}

export const rateItem = async(req,res)=>{
    try {
        const item = await items.findById(req.params.id)
        const rated = item.rating.some(rate => rate.userId === req.body.userId)
        if(rated) return sendErr(res,409,`You already rated ${item.name}`)
        item.rating = [...item.rating, req.body]
        await item.save()
        res.status(200).json(`${item.name} Rated Successfully`)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const likeItem = async(req,res)=>{
    try {
        let newLike
        const item = await items.findById(req.params.id)
        const liked = item.liked.find(like => like.userId === req.body.userId)
        if(liked){
            newLike = item.liked.filter(likes => likes.userId !== liked.userId)
            item.liked = newLike
            await item.save()
            return res.status(200).json(`${item.name} Successfully Unliked`)
        }
        newLike = [...item.liked,req.body]
        item.liked = newLike
        await item.save()
        res.status(200).json(`${item.name} Now Liked`)
       
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const updateItem = async(req,res)=>{
    try {
        const item = await items.updateOne({_id: req.params.id},req.body)
        res.status(200).json(item)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const getItem = async(req,res)=>{
    try {
        const item = await items.findById(req.params.id)
        res.status(200).json(item)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const getItems = async(req,res) =>{
    try {
        const allItems = await items.find()
        res.status(200).json(allItems)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const searchItems = async(req,res) =>{
    const string = req.params.string 
    const min = req.params.min
    const max = req.params.max
    try {
        const keywords = string.split(' ')
        //It includes all the keywords listed.
        let result = []
        const allItems = await items.find()
        allItems.forEach(item => {
            const name = item.name.toLowerCase()
            const stack = item.stack.toLowerCase()
            for(const key of keywords){
                const searchKey = key.toLowerCase()
                if(!name.includes(searchKey)){
                    if(!stack.includes(searchKey)){
                    return false
                    }
                }
               
            }
            result.push(item)
        })
        if(min !== 'undefined' && max !== 'undefined'){
        const minmax = await items.find({amount:{
            $gte:min,
            $lte:max
        }})
        const allResult = []
        const prototype = new Set()

        result.concat(minmax).forEach(item => {
            const string = JSON.stringify(item)
            if(!prototype.has(string)){
                prototype.add(string)
                allResult.push(item)
            }
        })

        result = allResult
        }
        
        res.status(200).json(result)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const deleteItem = async(req,res) =>{
    try {
        const item = await items.deleteOne({_id:req.params.id})
        res.status(200).json(item)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}