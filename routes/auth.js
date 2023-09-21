import { Router } from "express";
import { createUser, logUser, validateGmail, updateUser, deleteUser, getAllUsers, sendCode, getUser,returnLength, count, emailSignIn,sendMessage} from "../controllers/auth-controls.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/functions.js";

const route = Router()

route.post('/signup',createUser)
route.post('/emailsignin', emailSignIn)
route.post('/sendcode',sendCode)
route.post('/validategmail', validateGmail)
route.post('/sendmail', sendMessage)
route.post('/login', logUser )
route.get('/user/:id',verifyToken,getUser)
route.get('/fetchusers',verifyAdmin,getAllUsers)
route.get('/countusers',verifyAdmin,returnLength)
route.get('/count/:by',verifyAdmin,count)
route.put('/updateuser/:id',verifyUser,updateUser)
route.delete('/delete/:id',verifyUser,deleteUser)

export default route