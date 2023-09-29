const express = require("express");
const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    console.log("asdf");
    res.json({ status: true, message: "Logged ut successfully" });
  } catch (error) {
    res.json({ status: false, message: "could not log out" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }

    const token = jwt.sign({ email: email, id: user._id }, "secretkey");
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({ status: true, message: "Logged in successfully" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user !== null) {
      throw new Error("the user already exits");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: email, id: newUser._id }, "secretkey");
    res.cookie("token", token, {
      httpOnly: true,
    });

    await newUser.save();

    res.json({
      status: true,
      message: "successfully signup",
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports = {
  login,
  signup,
  logout,
};
