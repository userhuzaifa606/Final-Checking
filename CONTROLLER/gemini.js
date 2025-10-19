import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 const askGemini = async (req, res) => {
  try {
    const { prompt } = req.body; // text user sends (like report or question)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ reply: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gemini request failed", error });
  }
};
export default askGemini