const fetch = require("node-fetch");
const getTitle = require("get-url-title");
const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Link = require("../models/links");

//Get all
router.get("/", async (req, res) => {
  try {
    const links = await Link.find();
    res.json(links);
    //res.json({message: "blabla"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get one
router.get("/:id", getLink, (req, res) => {
  res.send(res.link);
});

//Creating one
router.post("/", async (req, res) => {
  var linkTitle = "";
  if (!req.body.title) {
    linkTitle = await getTitleWithTimeout(req.body.link);
  } else {
    linkTitle = req.body.title;
  }
  const link = new Link({
    name: linkTitle,
    link: req.body.link,
  });
  try {
    const newLink = await link.save();
    res.status(201).json(newLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Updating one
router.patch("/:id", getLink, async (req, res) => {
  if (req.body.isRead != null) {
    res.link.isRead = req.body.isRead;
  }
  try {
    const updatedLink = await res.link.save();
    res.json(updatedLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Deleting one
router.delete("/:id", getLink, async (req, res) => {
  try {
    await res.link.remove();
    res.json({ message: "Deleted link" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/shuffle", async (req, res) => {
  try {
    link = await Link.find();
    if (link == null) {
      return res.status(404).json({ message: "Could not find link" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.link = link;
});

async function getLink(req, res, next) {
  try {
    link = await Link.findById(req.params.id);
    if (link == null) {
      return res.status(404).json({ message: "Could not find link" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.link = link;
  next();
}

async function getTitleWithTimeout(link) {
  var linkTitle = "";
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, 500);
  });

  const getTitlePromise = getTitle(link);

  try {
    linkTitle = await Promise.race([getTitlePromise, timeout]);
    // The promise resolved within the timeout period
    // Handle the linkTitle here
  } catch (error) {
    linkTitle = "placeholder";
  }
  return linkTitle;
}

module.exports = router;
