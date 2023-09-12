const { NULL } = require("sass");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const addLink = async (req, res) => {
  try {
    const { name, link } = req.body;
    const { user } = req;

    if (!link) {
      return res.json({ error: "Link is required!" });
    }
    if (!name) {
      name = await getTitleWithTimeout(req.body.link);
    }

    const newLinkItem = {
      name: name,
      addition_date: Date.now(),
      link: link,
      isRead: false,
    };

    user.links.push({ ...newLinkItem });

    user.save((err, savedUser) => {
      if (err) {
        console.error("Error saving user:", err);
      } else {
        console.log("Link added to user:", savedUser);
        return res.json({ message: "saved" });
      }

      mongoose.connection.close();
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchAllLinks = async (req, res) => {
  try {
    const { user } = req;

    return res.json(user.links);
  } catch (error) {
    console.log(error);
  }
};
const fetchLink = async (req, res) => {}; // Is this necessary?

const updateLink = async (req, res) => {
  try {
    const { user } = req;
    const { isRead } = req.body;
    const { id } = req.params;

    console.log(req);
    const linkIndex = user.links.findIndex((link) => link._id.equals(id));

    if (linkIndex === -1) {
      throw new Error("Link not found");
    }

    if (isRead !== null) {
      user.links[linkIndex].isRead = isRead;
    }

    user.save((err, savedUser) => {
      if (err) {
        console.error("Error saving user:", err);
      } else {
        console.log("Link added to user:", savedUser);
        return res.json({ message: "saved" });
      }

      mongoose.connection.close();
    });

    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteLink = async (req, res) => {};

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
  } catch (error) {
    linkTitle = "placeholder";
  }
  return linkTitle;
}

module.exports = { addLink, fetchAllLinks, fetchLink, deleteLink, updateLink };
