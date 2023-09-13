const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const { authenticateUser } = require("../middleware/auth-middleware");

const {
  addLink,
  fetchAllLinks,
  fetchLink,
  updateLink,
  deleteLink,
} = require("../controllers/linkController");

//Get all
router.get("/", authenticateUser, fetchAllLinks);

//Creating one
router.post("/", authenticateUser, addLink);

//Updating one
router.patch("/:id", authenticateUser, updateLink);

//Deleting one
router.delete("/:id", authenticateUser, deleteLink);

module.exports = router;
