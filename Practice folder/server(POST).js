const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const students = [];

// Home Route
app.get("/students", (req, res) => {
    res.json(students);
});

// POST Route
app.post("/students", (req, res) => {

    const student = req.body;

    students.push(student);

    res.json({
        message: "Student added successfully",
        students: students
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});