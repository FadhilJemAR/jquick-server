import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnect from "./lib/dbConnect.js";
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
//middlewares

import { protect } from "./middlewares/protect.js";



//function
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.SERVER_PORT;


//app
app.use(express.json());
app.use(cors({origin:process.env.ALLOWED_ORIGIN,credentials:true}));
app.use(cookieParser());

app.use('/api/products',protect,productRouter);
app.use('/api/auth',userRouter);
app.use('/api/cart',protect,cartRouter)

app.listen(PORT,(err)=>{
    if(err)console.error(err);
    console.log(` server berjalan di ${process.env.BASE_URL}`)
})