const Student = require("../models/Student");

// GET /students
const getStudents = async (req, res) => {
    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });

    }
};

// GET /students/:id
const getStudentById = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
};

// POST /students
const createStudent = async (req, res) => {
    try {
        const { name, age, course, marks } = req.body;

        if (!name || age === undefined || !course || marks === undefined) {
            return res.status(400).json({
                message: "Name, age, course and marks are required"
            });
        }

        const newStudent = {
            name,
            age,
            course,
            marks
        };

      const student = await Student.create(newStudent);

        res.status(201).json({
            message: "Student created successfully",
                student
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create student"
        });
    }
};

// PUT /students/:id
const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, age, course, marks } = req.body;

       const student = await Student.findByIdAndUpdate(
    id,
    { name, age, course, marks },
    { new: true, runValidators: true }
);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update student"
        });
    }
};

// DELETE /students/:id
const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete student"
        });
    }
};

module.exports = {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
};