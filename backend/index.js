import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute  from "./Routes/review.js";
import bookingRoute from "./Routes/booking.js"
// import webhookRoute from "./Routes/webhook.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Api is working");
});

// // لازم مسار الـ Webhook يبقى أول حاجة قبل express.json()
// app.use("/webhook", bodyParser.raw({ type: "application/json" }), webhookRoute);

// MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
// Database Connection
connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
