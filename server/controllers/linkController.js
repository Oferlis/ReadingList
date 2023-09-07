const Link = require("../models/links");
const User = require("../models/user");

const addLink = async (req, res) => {
  try {
    const { name, link, userId } = req.body;

    if (!link) {
      return res.json({ error: "Link is required!" });
    }
    if (!name) {
      name = await getTitleWithTimeout(req.body.link);
    }

    const newLinkItem = await Link.create({
      name: name,
      addition_date: Date.now(),
      link: link,
      isRead: false,
    });

    User.findByIdAndUpdate(
      userId,
      { $push: { links: newLinkItem } },
      { new: true }, // To return the updated user document
      (err, updatedUser) => {
        if (err) {
          console.error("Error updating user:", err);
          return;
        }

        console.log("Item added to user:", updatedUser);

        // Close the Mongoose connection (if needed)
        mongoose.connection.close();
      }
    );
  } catch (error) {}
};

const fetchAllLinks = async (req, res) => {
  try {
    const { token } = req.cookies;
    console.log(req.cookies);
    console.log(token);

    //understand the userID from the token - use getProfile methd

    await User.findById(userId, "links", (err, user) => {
      if (err) {
        console.error("Error finding user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Access the 'links' array from the retrieved user and send it as JSON
      const links = user.links;
      return res.json({ links });
    });
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

module.exports = { addLink, fetchAllLinks, fetchLink, deleteLink, updateLink };
