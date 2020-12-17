const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
  author: {
    type: ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [{ type: String }],
  comments: [
    {
      textOfComment: { type: String, required: true },
      author: { type: String },
      likes: [{ type: String }],
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model("Post", postSchema);
