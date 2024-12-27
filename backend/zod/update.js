const zod = require('zod');
module.exports.updateSchema = zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()
}
)
