const express = require("express");
const router = express.Router();

const {
    getStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");

router.get("/students", getStudents);

router.get("/students/:id", getStudentById);

router.post("/students", addStudent);

router.put("/students/:id", updateStudent);

router.delete("/students/:id", deleteStudent);

module.exports = router;