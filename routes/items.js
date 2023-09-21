import { Router } from "express";
import { verifyAdmin, verifyUser } from "../utils/functions.js";
import { createItem, deleteItem, getItem, getItems, updateItem, rateItem, likeItem, searchItems} from "../controllers/items-controls.js";

const route = Router()

route.post('/additem',verifyAdmin,createItem)
route.put('/updateitem/:id',verifyUser,updateItem)
route.put('/rateitem/:id',rateItem)
route.put('/likeitem/:id',likeItem)
route.get('/allitems',getItems)
route.get('/item/:id',getItem)
route.get('/search/:string/:min/:max',searchItems)
route.delete('/deleteitem/:id',deleteItem)

export default route