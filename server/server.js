require("dotenv").config();
const dbConnect = require("./db/dbConnect");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

dbConnect();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const linksRouter = require("./routes/links.js");
const registerRouter = require("./routes/authRoutes.js");
app.use("/", registerRouter);
app.use("/links", linksRouter);

app.listen(8000, () => console.log("Server is up"));
