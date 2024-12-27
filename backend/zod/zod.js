const zod = require('zod');
module.exports.signupSchema = zod.object({
    username:zod.string().min(3).max(20),
    password:zod.string().min(6).max(100),
    firstname:zod.string().min(3).max(20),
    lastname:zod.string().min(3).max(20),

});
