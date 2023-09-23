import { Router } from "express";
import { verifyAdmin } from "../utils/functions.js";
import { create, deleteOne, get, getAll } from "../controllers/trash-control.js";

const route = Router()
route.post('/create/:token',verifyAdmin,create)
route.get('/get/:id/:token',verifyAdmin,get)
route.delete('/delete/:id/:token',verifyAdmin,deleteOne)
route.get('/getAll/:token',verifyAdmin,getAll)

export default route
