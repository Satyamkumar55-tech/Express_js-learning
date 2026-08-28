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

const updateStudent = (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;

    res.json({
        message: "Student updated successfully",
        student
    });
};

const deleteStudent = (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(student => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};