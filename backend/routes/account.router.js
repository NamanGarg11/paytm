const express = require('express');
const router = express.Router();
const Account = require('../models/account');
const { authmiddleware } = require("../middlewares/middlewares");
const mongoose = require('mongoose');

// Get account balance
router.get('/balance', authmiddleware, async (req, res) => {
    try {
        const userId = req.user._id;
        const userAccount = await Account.findOne({ userId });
        if (!userAccount) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ accountBalance: userAccount.accountBalance });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Transfer amount
router.post('/transfer', authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        const userAccount = await Account.findOne({ userId: req.user._id }).session(session);
        if (!userAccount || userAccount.accountBalance < amount) {
            throw new Error("Insufficient balance");
        }

        const recipientAccount = await Account.findOne({ userId: to }).session(session);
        if (!recipientAccount) {
            throw new Error("Invalid user");
        }

        // Deduct from sender's account
        await Account.updateOne(
            { userId: req.user._id },
            { $inc: { accountBalance: -amount } },
            { session }
        );

        // Add to recipient's account
        await Account.updateOne(
            { userId: to },
            { $inc: { accountBalance: amount } },
            { session }
        );

        await session.commitTransaction();
        res.json({ message: "Amount transferred successfully" });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message || "Transaction failed" });
    } finally {
        session.endSession();
    }
});

module.exports = router;
