require("dotenv").config();
const dbConnect = require("./db/dbConnect");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

dbConnect();

app.use(express.json());

const linksRouter = require("./routes/links.js");
const registerRouter = require("./routes/register.js");
app.use("/links", linksRouter);
app.use("/register", registerRouter);

app.listen(3001, () => console.log("Server is up"));
