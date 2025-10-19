import {createUser} from "../CONTROLLER/createuser.js";
import UpdateUser from "../CONTROLLER/updatepassword.js";
import { dashboard } from "../CONTROLLER/dashboard.js";
import loginUser from "../CONTROLLER/loginuser.js";
import protectedroute from '../Middleware/auth.middle.js';
import express,{ Router } from "express";
import logout from "../CONTROLLER/logout.js";
import cloudinary from 'cloudinary'
import fs from 'fs'
import multer from 'multer'
import Images from "../MODELS/Image.js";
import askGemini from "../CONTROLLER/gemini.js";
const router = express.Router();
router.post('/create-user',createUser)
router.post('/login',loginUser)
router.post('/askgemini', askGemini)
router.post('/updatepassword',UpdateUser)
router.get('/dashboard',protectedroute,dashboard)
router.get('/logout', protectedroute ,logout)
router.get('/verified',protectedroute,(req,res)=>{
    res.send({message:"you logged in"})
})
cloudinary.v2.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret:process.env.cloud_secret_api_key,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Image')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + file.originalname)
  }
})

const upload = multer({ storage: storage,
    fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/; // added pdf
    const ext = file.originalname.toLowerCase().split(".").pop();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images or PDF files are allowed!"));
    }
  },
 });
router.post("/upload", upload.single("pic"), async(req, res) => {

  const files = fs.readdirSync("Image/");
  const uploadedImages = [];

  for (const file of files) {
    try {
      const result = await cloudinary.v2.uploader.upload(`Image/${file}`);
      fs.unlink(`Image/${file}`, (err) => {
        if (err) console.error("Failed to delete file:", err);
        else console.log("Deleted local file successfully");
      });

      const savedImage = new Images({ url: result.url });
      await savedImage.save();
      uploadedImages.push(savedImage);
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({ status: 500, message: "Upload failed", error });
    }
  }

  // ✅ Send response once after all files are processed
  return res.status(200).json({
    status: 200,
    message: "All files uploaded and saved successfully",
    data: uploadedImages,
  });
});

export default router;