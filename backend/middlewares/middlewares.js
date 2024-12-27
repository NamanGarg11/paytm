const jwt = require("jsonwebtoken");
module.exports.authmiddleware=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       return  res.status(403).json({message:msg.console.error()
       })
    }
    const token = authHeader.split(' ')[1];
    try{
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            req.userId = decode.userId;
            next();
    }
    catch(err){
        return res.status(403).json({message:msg.console.error()})  
    }
}