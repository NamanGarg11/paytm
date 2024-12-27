const express = require("express");
const router = express.Router();
const zod = require('zod');
const user = require('../models/user');
const validation= require('../zod/zod');
const  Updatebody = require('../zod/update');
const auth = require('../middlewares/middlewares');
// user to singup the page
router.post("/signup",auth,async(req,res)=>{  
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
// user to signin the page
router.post('/sigin',async(req,res)=>{
    const body = req.body;
    const {success} = validation.safeParse(req.body);
    if(!success){
        return res.status(411).json({error:"Invalid data"});
    }
    const existinguser = await user.findOne({
        username:body.username,
        
    })
    if(!existinguser){
        return res.status(411).json({
            message:"User does not exist"
        })
    }
    if(existinguser.password !== body.password){
        return res.status(411).json({
            message:"Incorrect password"
        })
    }
    const token = user.jwtauth();
    res.status(200).json({token,existinguser})
})
// user to update the page
router.put('/' ,auth,async(req,res)=>{
    const body = req.body;
    const {success} = Updatebody.safeParse(req.body);
    if(!success){
        return res.status(411).json({error:"Invalid data"});
    }
    const update = await user.findOneAndUpdate({
        _id:req.user._id
    })
    res.json({
        message:"User updated successfully",
        update
    })
})
// user to filter out  the user data through query pararamte
router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || '';
    const users = await user.find();
    $or:[
    {
        firstname:{
            $regex:filter
        }
    },{
        lastname:{
            $regex:filter
        }
    }]
    res.json({
        users:user.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})
module.exports= router;  