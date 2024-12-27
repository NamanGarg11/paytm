const express = require('express');
const router = express.Router();
const account= require('../models/account');
const auth = require('../middlewares/middlewares');
const mongoose = require('mongoose');
router.get('/balance',auth,async(req,res)=>{
    const userId = req.user._id;
    const userAccount = await account.findOne({
        userId
    })
    res.json({
        accountBalance:userAccount.accountBalance
    })
})
router.post('transfer',auth,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;
    const account = await account.findOne({
        userId:req.user._id
    })
    if(!account || account.accountBalance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
    const toAccount = await account.findOne({
        userId:to
    }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid user"
        })
    }
    await account.updateOne({
        userId:req.user._id
    },{
        $inc:{
            accountBalance:-amount
        }
    }).session(session);
    await account.updateOne({
        userId:to
    },{
        $inc:{
            accountBalance:amount
        }
    })
    await session.commitTransaction();
    res.json({
        message:"Amount transferred successfully"
    });


})
module.exports = router;