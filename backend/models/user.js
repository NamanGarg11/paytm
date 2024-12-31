const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        min: 6,
        max: 30,

    }, 
    password:{
        type: String,
        required: true,
        min: 6,
    },
    firstname:{
        type: String,
        required: true,
        
    },
    lastname:{
        type: String,
        required: true,
        
    }


});
const user  = mongoose.model('User', userSchema);
userSchema.methods.jwtauth = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

module.exports = user;