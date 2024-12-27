const mongoose = require('mongoose');
const acccountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    accountBalance:{
        type:Number,
        required:true,
        default:0
    }
})
const account = mongoose.model('Account',acccountSchema);
module.exports = account;