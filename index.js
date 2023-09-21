import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import auth from './routes/auth.js'
import items from './routes/items.js'
import trash from './routes/trash.js'
import orders from './routes/orders.js'
import { createServer } from "http";
import { Server } from 'socket.io'

const app = express()
const server = createServer(app);


const io = new Server(server,{
    cors:{
    origin:['http://localhost:5173','https://honestbrand.netlify.app']
    }
})

 

io.on('connection',(socket)=>{
    socket.on('join-room',room=>{
        socket.join(room)
        console.log(room)
    })
    socket.on('send-notification',(notification, user) => {
        io.sockets.to(user).emit('new-notification',notification)
    })
})


dotenv.config()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173','https://honestbrand.netlify.app']
}))
app.use('/auth', auth)
app.use('/items', items)
app.use('/trash', trash)
app.use('/orders', orders)
const connection = async ()=>{
    try {
        await mongoose.connect(process.env.mongodb)
        console.log('Connected to MongoDb')
    } catch (err) {
        console.log(err)
    }
    
}
mongoose.connection.on('disconnection',err=>{
    console.log(err)
})
server.listen(process.env.port,()=>{
    console.log(`Backend started at ${process.env.port}`)
    connection()
})

