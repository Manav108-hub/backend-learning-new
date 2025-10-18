import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connection.js";

dotenv.config({
    path : "./.env"
})
const app = express()
const port = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(port , () => {
        console.log(`Server is live on port ${port}`);
    })
    
})
.catch((err) => {
    console.log("MONGO FAILED TO CONNECT" , err);
    
})