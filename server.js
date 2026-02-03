import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./lib/dbConnect";
import productRouter from './routes/productRoutes'
dotenv.config();
dbConnect();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(productRouter)

app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
