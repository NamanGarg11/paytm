const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const zod = require("zod");
const user = require("../models/user");
const validation = require("../zod/zod");
const Updatebody = require("../zod/update");
const { authmiddleware } = require("../middlewares/middlewares");

// Signup route
router.post("/signup", async (req, res) => {
    try {
        const { success, error } = validation.safeParse(req.body);
        if (!success) return res.status(400).json({ error: error.errors });

        const body = req.body;
        const existinguser = await user.findOne({ username: body.username });
        if (existinguser) return res.status(409).json({ message: "Email already taken" });

        body.password = await bcrypt.hash(body.password, 10); // Hash the password
        const newUser = await user.create(body);
        const token = newUser.jwtauth();
        res.status(201).json({ token, user: { username: newUser.username, _id: newUser._id } });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Signin route
router.post("/signin", async (req, res) => {
    try {
        const { success, error } = validation.safeParse(req.body);
        if (!success) return res.status(400).json({ error: error.errors });

        const body = req.body;
        const existinguser = await user.findOne({ username: body.username });
        if (!existinguser) return res.status(404).json({ message: "User does not exist" });

        const passwordMatch = await bcrypt.compare(body.password, existinguser.password);
        if (!passwordMatch) return res.status(401).json({ message: "Incorrect password" });

        const token = existinguser.jwtauth();
        res.status(200).json({ token, user: { username: existinguser.username, _id: existinguser._id } });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Update route
router.put("/", authmiddleware, async (req, res) => {
    try {
        const { success, error } = Updatebody.safeParse(req.body);
        if (!success) return res.status(400).json({ error: error.errors });

        const body = req.body;
        const update = await user.findOneAndUpdate({ _id: req.user._id }, body, { new: true });
        res.json({ message: "User updated successfully", update });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

// Bulk user query
router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const users = await user.find({
            $or: [
                { firstname: { $regex: filter, $options: "i" } },
                { lastname: { $regex: filter, $options: "i" } }
            ]
        }).skip((page - 1) * limit).limit(limit);

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            })),
            page,
            limit
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error.message });
    }
});

module.exports = router;
