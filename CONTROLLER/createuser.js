import User from "../MODELS/user.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
dotenv.config()
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    service: "gmail",
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD
    }
})
export const createUser = async (req, res) => {
    const { username, email, password, enic } = req.body;
    try {
        if (!(username && password && email && enic)) {
            return res.status(400).json({ message: "All input is required" });
        }
        const existedUsername = await User.findOne({ username });
        if (existedUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = (await User.create({ username, email,password, enic})).toObject();
        const sendingmail = await transporter.sendMail({
            from:process.env.USER_MAIL,
            to: email,
            subject: 'Login your account',
            html: `<h2>Hello   ${user.username}!</h2><p> <b>your Email :${user.email}</b></p><p>Your password:${user.password}Do login.</p>`
        });
        res.status(201).json({ message: "user created successfully go to login " });
      
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

    
