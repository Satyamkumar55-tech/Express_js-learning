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

module.exports = {
    getStudents
};