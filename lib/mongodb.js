import mongoose from "mongoose";

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB підключено");
  } catch (err) {
    console.error("❌ Помилка MongoDB:", err);
    throw err;
  }
}
