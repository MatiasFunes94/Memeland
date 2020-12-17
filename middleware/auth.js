const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const User = mongoose.model("User");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.header("Authorization") || req.body.headers.Authorization;
  if (!token) {
    return res.status(401).send({ msg: "No token, authorization denied" });
  }
  // const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.status(401).send({ msg: "token is not valid" });
    }
    const { id } = payload;
    const user = await User.findById(id).select("-password");
    req.user = user;
    next();
  });
};

module.exports = auth;
