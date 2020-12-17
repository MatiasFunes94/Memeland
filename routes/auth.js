const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [
    check("email").isEmail().withMessage("Invalid Email"),
    check("password")
      .isLength({ min: 6, max: 50 })
      .withMessage("Password must have at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((ele) => ele.msg) });
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ errors: ["User does not exists"] });
      }
      const doPasswordsMatch = await bcrypt.compare(password, user.password);
      if (!doPasswordsMatch) {
        return res.status(400).json({ errors: ["Invalid credentials"] });
      }
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              followers: user.followers,
              following: user.following,
              image: user.image
            },
          });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/", auth, (req, res) => {
  try {
    res.send({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      followers: req.user.followers,
      following:  req.user.following,
      image: req.user.image
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
