const User = require("../models/User");
const bcrypt = require("bcrypt");

// POST /auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input — what if name/email/password is missing?
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email,and password are required",
      });
    }

    // 2. Check existing email — User.findOne({ email })
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "This user already exist! try another email",
      });
    }

    // 3. Hash password — await bcrypt.hash(...)
    const hashedPassword = await bcrypt.hash(password, 8);
    // 4. Create + save user — new User({...}) then .save()
    //    OR User.create({...}) — look up the difference between these two
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    // 5. Send response — what should the response body contain?
    //    (Hint: should it include the password hash? Think about it.)
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id, name: newUser.name, email: newUser.email 
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

module.exports = {
  registerUser,
};
