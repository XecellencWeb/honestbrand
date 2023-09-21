import { Router } from "express";
import { verifyAdmin } from "../utils/functions.js";
import { create, deleteOne, get, getAll } from "../controllers/trash-control.js";

const route = Router()
route.post('/create',verifyAdmin,create)
route.get('/get/:id',verifyAdmin,get)
route.delete('/delete/:id',verifyAdmin,deleteOne)
route.get('/getAll',verifyAdmin,getAll)

export default route