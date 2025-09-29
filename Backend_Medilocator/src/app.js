import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from './routes/user.routes.js';
import storeRouter from './routes/store.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)   //when it click on /users it transfer control to the userRouter which is in user.routes.js
// http://localhost:800/api/v1/users/register
app.use("/api/v1/stores", storeRouter)

export {app};