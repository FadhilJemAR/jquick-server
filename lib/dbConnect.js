import mongoose from "mongoose";

async function dbConnect() {
  await mongoose.connect(process.env.MONGO_URI);
}

export default dbConnect;
