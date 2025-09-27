import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI
    );
    console.log(
      `\nMONGO connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:", error);
    process.exit(1);
  }
};

export default connectDB;