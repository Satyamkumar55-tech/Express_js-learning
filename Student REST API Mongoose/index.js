require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      family: 4,
    });

    console.log("MongoDB connected through Mongoose!");

    // Student Routes
    app.use("/students", studentRoutes);

    app.use("/auth", authRoutes);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

startServer();
