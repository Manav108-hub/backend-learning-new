import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connection.js";
// const app = express()

dotenv.config({
    path : "./.env"
})
console.log("🔍 Loaded MONGO_URI:", process.env.DATABASE_URL);

connectDB()