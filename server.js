import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT;


app.use(cors({origin:process.env.ALLOWED_ORIGIN}));


