import mongoose from "mongoose";

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/casino"; // Replace with your MongoDB URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
