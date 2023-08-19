require("dotenv").config();
const dbConnect = require("./db/dbConnect");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

dbConnect();

app.use(express.json());

const linksRouter = require("./routes/links.js");
const registerRouter = require("./routes/auth-routes.js");
app.use("/", registerRouter);
app.use("/links", linksRouter);

app.listen(3001, () => console.log("Server is up"));
