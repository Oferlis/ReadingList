const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const User = require("../db/userModel");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  bcrypt.genSalt(10).then((salt) => {
    bcrypt
      .hash(req.body.password, salt)
      .then((hashedPassword) => {
        const user = new User({
          email: req.body.email,
          password: hashedPassword,
        });

        user
          .save()
          .then((result) => {
            res
              .status(200)
              .send({ message: "User was successfuly created", result });
          })
          .catch((e) => {
            console.log(e);
            res.status(500).send({ message: "Error creating user", e });
          });
      })
      .catch((e) => {
        res
          .status(500)
          .send({ message: "Password was not hashed succesfuly", e });
      });
  });
});

router.post("/login", async (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return res
              .status(400)
              .send({ message: "Password does not match", error });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          res
            .status(200)
            .send({ message: "Login Successful", email: user.email, token });
        })
        .catch((error) => {
          res.status(400).send({ message: "Password does not match", error });
        });
    })
    .catch((e) => {
      res.status(404).send({ message: "Email not found", e });
    });
});

router.get("/free-endpoint", async (req, res) => {
  res.json({ message: "You are free to access" });
});

router.get("/auth-endpoint", auth, async (req, res) => {
  res.json({ message: "You are authorized to access" });
});

module.exports = router;
