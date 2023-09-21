import { Router } from "express";
import { create, getAll } from "../controllers/notifications-controls.js";

const route = Router()

route.post('/add',create)
route.get('/all',getAll)


export default route