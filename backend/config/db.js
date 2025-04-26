import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbURL = process.env.DATABASE_URL;
    if (!dbURL) {
      throw new Error("❌ DATABASE_URL is not defined in .env file");
    }

    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Database Connection error: ", error.message);
  }
};

export default connectDB;
