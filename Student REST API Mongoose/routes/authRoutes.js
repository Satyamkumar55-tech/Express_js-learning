const express = require("express");
const { registerUser, loginUser,getProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware,getProfile);
// POST /register
router.post("/register", registerUser);
// POST /Login
router.post("/login", loginUser);


module.exports = router;
