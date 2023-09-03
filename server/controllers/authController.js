const User = require("../models/user");
const { hashPassword, comparePassword } = require("../auth");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
      return res.json({ error: "First name and last name are required" });
    }

    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters" });
    }

    const exist = await User.findOne({ email });
    if (!email || exist) {
      return res.json({ error: "email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    return res.json({ user });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "No user found" });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      res.json({ error: "Password is incorrect!" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser };
