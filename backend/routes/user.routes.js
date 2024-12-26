const express = require("express");
const router = express.Router();
const zod = require('zod');
const user = require('../models/user');
const signupSchema = zod.object({
    username:zod.string().min(3).max(20),
    password:zod.string().min(6).max(100),
    firstname:zod.string().min(3).max(20),
    lastname:zod.string().min(3).max(20),

});
router.post("/signup",async(req,res)=>{  
    const body = req.body;
     const {success} = validation.safeParese(req.body);
    if(!success){
    return res.status(411).json({error:"Invalid data"});
}
    const existinguser = user.findOne({
        username:body.username
    })   
    if(user._id){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
    }
  const newUser=await user.create(body);
  res.json({
    message:"User created successfully"
  })
    const token = user.jwtauth();
    res.status(200).json({token,user})

}
)

module.exports= router;  