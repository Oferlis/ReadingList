const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function authenticateUser(req, res, next) {
  try {
    const { token } = req.cookies;
    result = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) {
        return null;
      }
      return user.id;
    });
    const user = await User.findById(result);

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
}

module.exports = { authenticateUser };
