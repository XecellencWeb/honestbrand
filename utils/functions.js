import jwt from 'jsonwebtoken'

export const sendErr = (res,err,mes)=>{
    res.status(err || 500).json(mes || 'An Error occured')
}

export const verifyToken = async(req,res,next)=>{
    const token = req.cookies['access_token']
    console.log(token)
    if(!token) return sendErr(res,401,'You are not authenticated')
    const user = jwt.verify(token,process.env.token)
    req.user = user
     next()
   
}

export const verifyUser = async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin)next()
    })
}
export const verifyAdmin = async(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(!req.user.isAdmin) return sendErr(res, 401,'Not an admin')
        next()
    })
}
