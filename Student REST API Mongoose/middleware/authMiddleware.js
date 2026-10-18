const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Access Denied: Missing or malformed token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // verify, attach decoded payload to req, call next()
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // 401, don't call next
    return res.status(401).json({ error: "token not verified" });
  }
}

module.exports = authMiddleware;
