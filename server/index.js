require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/UserSchema.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("./handler/auth.js");

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/signup", async (req, res) => {
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
});

app.post("/api/login", async (req, res) => {
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
    console.log("user");

    const token = jwt.sign({ email: email, id: user._id }, "secretkey");
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({ status: true, message: "Logged in successfully" });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});

// this is a procteted route. only auth users can access it

app.get("/api/verify-login", auth, async (req, res) => {
  try {
    // also read post delete update methods can be perform
    res.json({
      status: true,
      message: "this is only for auth users",
      info: req.user,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});

app.get("/api/logout", async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
      })
      .send({
        status: true,
        message: "log out success",
        info: req.user,
      });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/newform")
  .then(() => console.log("connected..."))
  .catch(() => console.error("could not connetct..."));

app.listen(5000, () => console.log("working 5000"));
