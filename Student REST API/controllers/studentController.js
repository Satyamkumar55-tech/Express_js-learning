const students = require("../data/students");

const getStudents = (req, res) => {
    res.json(students);
};

const getStudentById = (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
};

const addStudent = (req, res) => {
    const { name, age } = req.body;

    if (!name || age === undefined) {
        return res.status(400).json({
            message: "Name and age are required"
        });
    }

    const student = {
        id: students.length + 1,
        name,
        age
    };

    students.push(student);

    res.status(201).json(student);
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent
};