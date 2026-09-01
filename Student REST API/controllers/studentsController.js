const { ObjectId } = require("mongodb");

// GET /students
const getStudents = async (req, res) => {
    try {
        const students = await req.db
            .collection("students")
            .find()
            .toArray();

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

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const student = await req.db
            .collection("students")
            .findOne({
                _id: new ObjectId(id)
            });

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

        const result = await req.db
            .collection("students")
            .insertOne(newStudent);

        res.status(201).json({
            message: "Student created successfully",
            student: {
                _id: result.insertedId,
                ...newStudent
            }
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

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const { name, age, course, marks } = req.body;

        const result = await req.db
            .collection("students")
            .updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        name,
                        age,
                        course,
                        marks
                    }
                }
            );

        if (result.matchedCount === 0) {
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

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid student ID"
            });
        }

        const result = await req.db
            .collection("students")
            .deleteOne({
                _id: new ObjectId(id)
            });

        if (result.deletedCount === 0) {
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
    deleteStudent
};