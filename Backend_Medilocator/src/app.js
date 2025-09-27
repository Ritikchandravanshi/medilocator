import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ CORS Setup
app.use(cors({
    origin: true, // Example: "http://localhost:5179" //ye abhi k liye h baad m production k liye safe nahi change kkar llena ritik bhai yaad se 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';

// Routes declaration
app.use("/api/v1/users", userRouter); // Example: http://localhost:8000/api/v1/users/register

export { app };
