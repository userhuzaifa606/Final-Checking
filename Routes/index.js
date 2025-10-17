import {createUser} from "../CONTROLLER/createuser.js";
// import {verify} from "../CONTROLLER/createuser.js";
import { dashboard } from "../CONTROLLER/dashboard.js";
import loginUser from "../CONTROLLER/loginuser.js";
import protectedroute from '../Middleware/auth.middle.js';
import express,{ Router } from "express";
import logout from "../CONTROLLER/logout.js";
const router = express.Router();
router.post('/create-user',createUser)
router.post('/login',loginUser)
// router.post('/verify',verify)
router.get('/dashboard',protectedroute,dashboard)
router.get('/logout', protectedroute ,logout)
router.get('/verified',protectedroute,(req,res)=>{
    res.send({message:"you logged in"})
})
export default router;