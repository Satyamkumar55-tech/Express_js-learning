const express = require("express");

const {
    getStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentsController");

const router = express.Router();

module.exports = (db) => {

    // Give every route access to MongoDB
    router.use((req, res, next) => {
        req.db = db;
        next();
    });

    // GET all students
    router.get("/", getStudents);

    // GET one student
    router.get("/:id", getStudentById);

    // CREATE student
    router.post("/", createStudent);

    // UPDATE student
    router.put("/:id", updateStudent);

    // DELETE student
    router.delete("/:id", deleteStudent);

    return router;
};