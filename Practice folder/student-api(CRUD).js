const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const students = [];

// Read
app.get("/students", (req, res) => {
    res.json(students);
});

// Create
app.post("/students", (req, res) => {

    const student = req.body;

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student
    });

});

//Delete
app.delete("/students/:id",(req,res) =>{
    const id = Number(req.params.id);

 students.splice(id, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});