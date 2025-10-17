import User from '../MODELS/user.js';
export const dashboard = async(req,res)=>{
    res.send({message:req.user})
}