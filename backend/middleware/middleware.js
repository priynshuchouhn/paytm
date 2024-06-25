const z = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

headerSchema = z.object({
    authorization: z.string()
})

function authMiddleware(req,res,next){
    try {
        const {success} = headerSchema.safeParse(req.headers)
        if(!success){
            return res.status(403).json({success: false, message: 'No token found'})
        }
        const token = req.headerSchema.authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({success: false, message: 'No token found'})
        }
        const decodedUser = jwt.verify(token,JWT_SECRET);
        if(!decodedUser){
            return res.status(403).json({success: false, message: 'Unauthorized user'})
        }
        req.user = decodedUser
        next();
    } catch (error) {
        return res.status(500).json({success: false, message: 'internal server error'})
    }
}


module.exports = authMiddleware;