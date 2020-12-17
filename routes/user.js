const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const auth = require("../middleware/auth");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const userImage = require('../userImageProfile');

router.post(
  "/",
  [
    check("username")
      .isLength({ min: 2, max: 30 })
      .withMessage("Name must have at least 2 characters"),
    check("email").isEmail().withMessage("Invalid Email"),
    check("password")
      .isLength({ min: 6, max: 50 })
      .withMessage("Password must have at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((ele) => ele.msg) });
      }
      const user = await User.findOne({ email }).select("-password");
      if (user) {
        return res.status(400).json({ errors: ["User already exists"] });
      }
      const userCreate = new User({
        username,
        email,
        password,
        image: userImage,
      });
      const hashedPassword = await bcrypt.hash(password, 10);
      userCreate.password = hashedPassword;
      const userCreated = await userCreate.save();
      jwt.sign(
        { id: userCreate._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user: {
              id: userCreate._id,
              username: userCreated.username,
              email: userCreated.email,
              followers: userCreated.followers,
              following: userCreated.following,
              image: userCreated.image
            },
          });
        }
      );
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.put("/follow/:userToFollow", auth, async (req, res) => {
  let userToFollow = req.params.userToFollow;
  userToFollow = userToFollow.replace(/\s/g, "");
  try {
    const user = await User.findById(req.user._id).select("-password");
    const userFound = await User.findById(userToFollow).select(
      "-password"
    );
    if (!userFound) {
      res.status(404).json("user does not exists");
    }
    if (userFound.followers.find((user) => user === req.user.username)) {
      res.status(400).json("You are already following this user");
    }
    userFound.followers.push(req.user.username);
    user.following.push(userFound.username);
    await user.save();
    await userFound.save();
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      image: user.image
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/unfollow/:userToUnfollow", auth, async (req, res) => {
  let userToUnfollow = req.params.userToUnfollow;
  userToUnfollow = userToUnfollow.replace(/\s/g, "");
  try {
    let user = await User.findById(req.user._id).select("-password");
    
    let userFound = await User.findById(userToUnfollow).select(
      "-password"
    );
    if (!userFound) {
      res.status(404).json("user does not exists");
    }
    userFound.followers = userFound.followers.filter(
      (user) => user !== req.user.username
    );
    user.following = user.following.filter(
      (user) => user !== userFound.username
    );
    await userFound.save();
    await user.save();
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      image: user.image
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/profile/", auth, async (req, res) => {
  try {
    const { image } = req.body;
    const user = await User.findById(req.user._id).select("-password");
    user.image = image;
    const userUpdated = await user.save();
    res.status(200).json(userUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
