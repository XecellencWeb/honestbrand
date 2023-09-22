import { Router } from "express";
import { verifyAdmin } from "../utils/functions.js";
import { createOrder,getAllOrders,getOrder,deleteOrder,resolveOrder } from "../controllers/orders-controls.js";

const route = Router()

route.post('/addorder',createOrder)
route.get('/allorders',getAllOrders)
route.get('/order/:id',getOrder)
route.put('/resolve/:id',resolveOrder)
route.delete('/delete/:id/:token',verifyAdmin,deleteOrder)

export default route
