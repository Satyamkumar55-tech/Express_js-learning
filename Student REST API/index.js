const express = require("express");

const app = express();

app.use(express.json());

const studentRoutes = require("./routes/studentsRoutes");

app.use(studentRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});