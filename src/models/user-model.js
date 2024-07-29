const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordConfirmation: {
      type: String,
      required: true,
    },
  },
  { Timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
