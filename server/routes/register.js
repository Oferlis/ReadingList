const fetch = require("node-fetch");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const User = require("../db/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
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
              .status(201)
              .send({ message: "User was successfuly created" }, result);
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

module.exports = router;
