import User from '../MODELS/user.js'
import jwt from 'jsonwebtoken'
import express from 'express'
import { configDotenv } from 'dotenv'
const app = express()
configDotenv()
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!(email && password)) { return res.send(" email and password is required") }
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(400).send('invalid credential')
        }        
        const isPassword = await password == existUser.password
        if (!isPassword) {
            return res.status(400).send({ message: ' invalid credential ' })
        }
         
        const token = jwt.sign({ userId: existUser._id, email: existUser.email }, process.env.TOKEN_KEY)
          res.cookie('JWT',token,{
                    expires:new Date(Date.now()+86400000),
                    httpOnly:true,
                    secure: true,
                    sameSite:"None"
                })
        return res.status(200).send({ status: 200, message: "User login Successfully!", data: existUser, token: token });
    } catch (error) {
        res.send({ message: error.message })
    }
}
export default loginUser