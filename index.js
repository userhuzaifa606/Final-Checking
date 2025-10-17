import express from 'express';
import mongoose from 'mongoose';
import connectDB from './DB/index.js';
import router from './Routes/index.js';
import User from './MODELS/user.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const PORT = 5000;
connectDB();
app.use(express.json());
app.use(cors( {
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use('/api',router);
app.listen(PORT , ()=>{
    console.log(`http://localhost:${PORT}`);
});

app.get('/',(req,res)=>{
    // getting all users
    User.find().then((users)=>{res.json(users);}).catch((err)=>{
        res.status(500).json({error:err.message});
    })
}); 
