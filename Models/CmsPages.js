/**
 * Models/cmspages.js
 *
 * Create mongoDB Schema for the CMS pages.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cmspages = new Schema({
  Title: {
    type: String,
    required: [true, "Title is required"],
  },
  Content: {
    type: String,
    required: [true, "Content is required"],
  }
});

const MessageModel = mongoose.model("CMSpages", cmspages);

module.exports = MessageModel;
