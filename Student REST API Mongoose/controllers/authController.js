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
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// POST /auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input — what if email/password is missing?
    if (!email || !password) {
      return res.status(400).json({
        message: "email,and password are required",
      });
    }

    // 2. Check existing email — User.findOne({ email })
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "Autenthication failed!",
      });
    }
    // 1. Use await and assign the boolean result to a variable
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    // 2. Use the boolean in an if-check to handle the client response
    if (isPasswordValid) {
      res.status(200).json({ 
        message: "Login successful!",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
    } else {
      // Handle the failure case for the client
      res.status(401).json({ error: "Authentication Failed!" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
