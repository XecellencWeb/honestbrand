import jwt from 'jsonwebtoken'
import users from "../module/user.js";
import { sendErr} from '../utils/functions.js';
import sender from 'nodemailer'
import { generateVerifyText } from '../html-makeup/verifymail.js';
import { generateMessageText } from '../html-makeup/message.js';

const jwtSign = (res,user)=>{
    const token = jwt.sign({id: user._id , isAdmin: user.isAdmin}, process.env.token)
    
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);
    
    res.cookie('access_token', token, {
    httpOnly: false, 
    expires: expirationDate,
    }).status(200).json(user)
}

export const createUser = async(req,res)=>{
    try {
       const user = await  users.create(req.body)
        res.status(200).json(user)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const emailSignIn = async(req,res)=>{
    const {name,picture,email,verified_email,} = req.body
    try {
        const exist = await users.findOne({email:email})
        if(exist) {
            jwtSign(res,exist)
            return
        }

        const user = await users.create({
            fullName:name,
            picture,
            email,
            verified:verified_email,
            password:name
        })
        jwtSign(res,user)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

const createMailTransport = ()=>{
    const josiah = sender.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.gmail,
            pass: process.env.password
        }
    })
    return josiah
}
const sendMail = async(req,res,mail)=> {
    try {
        const {response} = await mail.transport.sendMail({
            from: process.env.gmail,
            to: mail.toEmail || req.body.email,
            subject: mail.subject,
            html: mail.html || generateVerifyText(mail.email,mail.code)
        })
        console.log(`email sent: ${response}`)
        res.status(200).json(`email sent: ${response}`)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const sendCode = async(req,res)=>{
    const josiah = createMailTransport()
    
  await sendMail(req,res,{
    subject:'Verify Honest Brand Email',
    email:req.body.email,
    code: req.body.code,
    transport:josiah,
})
        
}

export const validateGmail = async(req,res)=>{
    try {
        const user = await users.findOne({email: req.body.email})
        if(!user) return sendErr(res, 404, 'An error occured')
            user.verified = true
            await user.save()
            res.status(200).json(user)
    
       
    } catch (err) {
        sendErr(res,err.status, err.message)
    }
}

export const sendMessage = async(req,res)=>{
    const josiah = createMailTransport()
    const {subject,email,name,stack,toEmail} = req.body
    await sendMail(req,res,{
        subject,
        email,
        transport:josiah,
        toEmail,
        html:generateMessageText({
            subject,
            email,
            toEmail,
            name,
            stack
        })
    })
}

export const logUser = async(req,res)=>{
    try {
        const user = await users.findOne({email: req.body.email})
        if(!user) return res.status(404).json('User Does not Exist')
        if(user.password !== req.body.password) return res.status(401).json('Please enter the right Password')
        if(!user.verified) return res.status(401).json('Your Acount has not been verified')
        jwtSign(res,user)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}

export const getAllUsers = async(req,res)=>{
        try {
            const allUsers = await users.find()
            res.status(200).json(allUsers)
        } catch (err) {
            sendErr(res, err.status, err.message)
        }
}
export const updateUser = async(req, res)=>{
    try {
        const user = await users.findById(req.params.id)
        const updateUser = {...user,...req.body}
        Object.assign(user, updateUser)
        await user.save()
        res.status(200).json(updateUser)
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
export const getUser = async(req,res)=>{
    try {
        const user = await users.findById(req.params.id)
        if(!user) sendErr(res,'you are not authorized')
        res.status(200).json(user)
    } catch (err) {
        sendErr(res, err.status, err.message)
    }
}
export const deleteUser = async(req,res)=>{
    try {
        const user = await users.findById(req.params.id)
        await user.deleteOne()
        res.status(200).json('User has been Deleted')
    } catch (err) {
        sendErr(res,err.status, err.message)
    }
}

export const returnLength = async(req,res)=>{
        try {
            const count = await users.count()
            res.status(200).json(count)
        } catch (err) {
            sendErr(res,err.status,err.message)
        }
   
  
}

export const count = async(req,res)=>{
    try {
        if(req.params.by === 'admin'){
            try {
                const count = await users.count({isAdmin:true})
                res.status(200).json(count)
            } catch (err) {
                sendErr(res,err.status,err.message)
            }  
        }
        if(req.params.by === 'customers'){
            try {
                const count = await users.count({isAdmin:false})
                res.status(200).json(count)
            } catch (err) {
                sendErr(res,err.status,err.message)
            }  
        }
    } catch (err) {
        sendErr(res,err.status,err.message)
    }
}
