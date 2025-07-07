import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error(
        "Please provide MONGO_URI in the .env file"
    );
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}
export default connectDB;