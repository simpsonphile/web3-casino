import mongoose from "mongoose";

// MongoDB connection URI

const connectDB = async () => {
  const mongoURI = process.env.MONGO_DB_URI;
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
