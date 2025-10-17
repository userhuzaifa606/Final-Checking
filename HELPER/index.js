import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
const transporter  = nodemailer.createTransport({
    host:"smtp.ethereal.email",
    service:"gmail",
    auth:{
        user:process.env.USER_MAIL,
        pass:process.env.USER_PASSWORD
    }
})

export default transporter