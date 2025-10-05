const User=require('../models/userModel')
const jwt=require('jsonwebtoken')

// verify seller
const auth=async(req,res,next)=>{
    const token=req.headers.authorization;

    if(!token)
    {
        return res.status(401).json({status:401,message:'Missing Token'})
    }
    try {

        const decodedToken=jwt.verify(token,process.env.SECRET);

        if(!decodedToken)
        {
            return res.status(401).json({status:401,message:'Unathorized User'})
        }

        const user=await User.findById({_id:decodedToken._id});

        req.user=user;
        req.id=decodedToken._id;
        next();
        
    } catch (error) {
        res.status(401).json({status:401,message:'Invalid/expired token'})
    }
}


// verify admin
const adminVerify=async(req,res,next)=>{
    try {
      
        const user=await User.findById({_id:req.id});

        if(user.role !=='admin')
        {
            return res.status(401).json({status:401,message:'Unathorized User'})
        }
        else{
            next();
        }

    } catch (error) {
        res.status(401).json({status:401,message:'Unathorized User'})
    }
}

module.exports={auth,adminVerify}