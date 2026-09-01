require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const studentRoutes = require("./routes/studentsRoutes");

const app = express();

app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI, {
    family: 4
});

async function startServer() {
    try {
        await client.connect();

        const db = client.db("collegeDB");

        console.log("MongoDB connected!");

        app.use("/students", studentRoutes(db));

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

startServer();