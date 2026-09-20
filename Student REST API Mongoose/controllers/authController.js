const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST /auth/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validate input — what if name/email/password is missing?


        // 2. Check existing email — User.findOne({ email })


        // 3. Hash password — await bcrypt.hash(...)


        // 4. Create + save user — new User({...}) then .save()
        //    OR User.create({...}) — look up the difference between these two


        // 5. Send response — what should the response body contain?
        //    (Hint: should it include the password hash? Think about it.)

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Registration failed"
        });
    }
};

module.exports = {
    registerUser
};