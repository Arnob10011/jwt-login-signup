const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [1, "Subject must have atleast 1 characters"],
    maxLength: [200, "Subject must be less than 50 characters"],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [1, "Subject must have atleast 1 characters"],
    maxLength: [2000, "Subject must be less than 500 characters"],
  },

  signedUpAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
// const Contact = mongoose.model('Feeds', contactSchema);

module.exports = User;
