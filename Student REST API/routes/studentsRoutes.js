const express = require("express");
const router = express.Router();

const {
    getStudents,
    addStudent,
    getStudentById
} = require("../controllers/studentController");

router.get("/students", getStudents);

router.get("/students/:id", getStudentById);

router.post("/students", addStudent);

module.exports = router;