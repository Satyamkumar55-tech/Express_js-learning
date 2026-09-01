const express = require("express");
const { getStudents } = require("../controllers/studentsController");

const router = express.Router();

module.exports = (db) => {

    router.use((req, res, next) => {
        req.db = db;
        next();
    });

    router.get("/", getStudents);

    return router;
};