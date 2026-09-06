const express = require("express");

const {
    getStudents
} = require("../controllers/studentController");

const router = express.Router();


// GET /students
router.get("/", getStudents);


module.exports = router;