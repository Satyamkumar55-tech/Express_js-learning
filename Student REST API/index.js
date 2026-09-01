require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const studentRoutes = require("./routes/studentsRoutes");

const app = express();


// Middleware
app.use(express.json());


// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI, {
    family: 4
});


async function startServer() {

    try {

        // Connect to MongoDB
        await client.connect();

        // Select database
        const db = client.db("collegeDB");

        console.log("MongoDB connected!");


        // Student routes
        app.use("/students", studentRoutes(db));


        // Start server
        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });

    } catch (error) {

        console.error("MongoDB connection failed:", error);

    }
}


startServer();