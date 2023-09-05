const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {
  addLink,
  fetchAllLinks,
  fetchLink,
  updateLink,
  deleteLink,
} = require("../controllers/linkController");

//Get all
router.get("/", fetchAllLinks);

//Get one
router.get("/:id", fetchLink);

//Creating one
router.post("/", addLink);

//Updating one
router.patch("/:id", updateLink);

//Deleting one
router.delete("/:id", deleteLink);

module.exports = router;
