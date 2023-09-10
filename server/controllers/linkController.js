const { NULL } = require("sass");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const addLink = async (req, res) => {
  try {
    console.log("addlink");
    const { name, link } = req.body;
    const { token } = req.cookies; //add auth middleware instead of checking cookies

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

    const user = await getUser(token);
    console.log(user);
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
    const { token } = req.cookies;

    const user = getUser(token);
    return res.json(user.links);
  } catch (error) {
    console.log(error);
  }
};
const fetchLink = async (req, res) => {};
const updateLink = async (req, res) => {};
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

async function getUser(token) {
  result = jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
    if (err) {
      return null;
    }
    return user.id;
  });
  ret = await User.findById(result);

  return ret;
}

module.exports = { addLink, fetchAllLinks, fetchLink, deleteLink, updateLink };
