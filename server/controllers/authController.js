const User = require("../models/user");
const Blacklist = require("../models/blacklist");
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
      links: [],
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
          links: user.links,
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

const logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header
    if (!authHeader) return res.sendStatus(204); // No content
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send a no content response.
    if (checkIfBlacklisted) return res.sendStatus(204);
    // otherwise blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();
    // Also clear request cookie on client
    res.setHeader("Clear-Site-Data", '"cookies", "storage"');
    res.status(200).json({ message: "You are logged out!" });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) throw err;

        res.json(user);
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, getProfile };
