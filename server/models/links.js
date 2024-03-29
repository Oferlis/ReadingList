const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addition_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  link: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
