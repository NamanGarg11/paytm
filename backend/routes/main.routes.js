const express= require('express');
const router = express.Router();
const userRouter = require("./user.routes");
const accountRouter = require("./account.router");
router.use("/user",userRouter);
router.use("/account",accountRouter);
module.exports = router;