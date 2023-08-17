const mongoose = require("mongoose");
const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const { createError } = require("../error.js");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const newPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({ ...req.body, password: newPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    // res.status(500).json({ message: error.message });
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    console.log(token);
    // res
    //   .cookie("access_token", token, {
    //     httpOnly: true,
    //   })
    //   .status(200);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
