const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Token header se lo
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, access denied!" });
    }

    const token = authHeader.split(" ")[1];

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    next(); // aage jao
  } catch (err) {
    res.status(401).json({ message: "Invalid token!" });
  }
};

module.exports = protect;
