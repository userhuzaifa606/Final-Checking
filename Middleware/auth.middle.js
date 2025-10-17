import User from '../MODELS/user.js';
import jwt from 'jsonwebtoken'
const  protectedroute = async(req,res,next)=>{
    try {
        const vartoken = req.cookies.JWT;
        
        if (!vartoken){
           return res.status(400).send({message:"no token provided"})
        }
        const decoded = jwt.verify(vartoken, process.env.TOKEN_KEY);
        if(!decoded){
            return res.status(401).send({message:"token is invalid"})
        };
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        req.user = user
        next()
    } catch (error) {
       res.send( error.message)
    }
}
export default protectedroute