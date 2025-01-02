import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import path from "path";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId, Collection } from "mongodb";
import userRouter from './routes/user.routes.js'
import mongoose from "mongoose";
// import { count } from "console";

// Configure dotenv
dotenv.config();

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// https://github.com
app.use(
  cors({
    credentials: true,
    origin: ["https://camo.githubusercontent.com"],
  })
);
app.use(cookieParser());
app.use(express.json());

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;
mongoose.connect(uri);

app.get('/', async (req, res) => {
    return res.json({mssg: "Hello"});
});

app.use('/api', userRouter);

// console.log("Hello!");
// http://localhost:5000

app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
