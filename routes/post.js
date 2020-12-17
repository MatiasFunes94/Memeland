const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const auth = require("../middleware/auth");
const uploadFile = require('../middleware/uploadImage');

//------------post------------//

//find All most recents posts
router.get("/recents", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).populate(
      "author",
      "_id username followers following image"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find All my favorites posts
router.get("/favorites", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "_id username followers following image"
    )
    const favoritesPosts = posts.filter((post) => post.likes.find((username) => username === req.user.username))
    res.status(200).json(favoritesPosts)
  } catch (error) {
    res.status(400).json(error);
  }
});

//find All posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate(
      "author",
      "_id username followers following image"
    );
    const postsMostLiked = posts.filter((post) => post.likes.length >= 2)
    res.status(200).json(postsMostLiked);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find all my posts
router.get("/myPosts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ date: -1 }).populate(
      "author",
      "_id username followers following image"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find All posts of userId
router.get("/:userId", auth, async (req, res) => {
  try {
    let userId = req.params.userId;
    userId = userId.replace(/\s/g,'');
    const posts = await Post.find({ author: userId }).sort({ date: -1 }).populate(
      "author",
      "_id username followers following image"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
});

//find All posts of following
router.put("/following", async (req, res) => {
  try {
    const { following } = req.body
    
    const usersIds = []
    const users = await Promise.all(following.map(async(username) => User.find({ username: username }))) 
    users.map((user) => user.map((user) => usersIds.push(user._id)))
    const posts = await Promise.all(usersIds.map(async(userId) => Post.find({ author: userId }).populate(
      "author",
      "_id username followers following image"
    )))
    
    const postsFollowing = [];
    posts.map((post) => post.map((post) => postsFollowing.push(post)))
    const postsSorted = postsFollowing.sort((a, b) => parseFloat(b.likes.length) - parseFloat(a.likes.length));
    res.status(200).json(postsSorted);
  } catch (error) {
    res.status(400).json(error);
  }
});

//create post
router.post("/", auth, async (req, res) => {
  try {
    const { description, photo } = req.body;
    const post = new Post({
      description,
      author: req.user,
      photo,
    });
    const postCreated = await post.save();
    res.status(200).json(postCreated);
  } catch (error) {
    res.status(400).json(error);
  }
});

//update post (description)
router.put("/:postId", auth, async (req, res) => {
  try {
    const { description } = req.body;
    const { postId } = req.params;
    const post = await Post.findById(postId);
    post.description = description
    const postUpdated = await post.save();
    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(400).json(error);
  }
});

//delete post
router.delete("/:postId", auth, async (req, res) => {
  try {
    let postId = req.params.postId;
    postId = postId.replace(/\s/g,'');
    const post = await Post.findById(postId)
    if(!post) {
      return res.status(404).json("post not found")
    }
    if(post.author.toString() !== req.user._id.toString()){
      return res.status(401).json("You are not allowed to do that");
    }
    await post.remove();
    res.status(200).json("Post is removed!");
  } catch (error) {
    res.status(400).json(error);
  }
});

//------------post------------//

//------------like------------//

//add like to post
router.put("/like/:postId/:username", async (req, res) => {
  const { postId, username } = req.params;
  try {
    const post = await Post.findById(postId).populate("author", "_id username followers following image");
    if (!post) return res.status(404).json("Post not found");
    if (post.likes.find((like) => like === username)) {
      return res.status(401).json("Post is already liked");
    }
    post.likes.push(username);
    const postLiked = await post.save();
    res.status(200).json(postLiked);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

//remove like from post
router.put("/unlike/:postId/:username", async (req, res) => {
  const { postId, username } = req.params;
  try {
    const post = await Post.findById(postId).populate("author", "_id username followers following image");
    if (!post) return res.status(404).json("Post not found");
    const removeLikeFromPost = post.likes.filter((like) => like !== username);
    post.likes = removeLikeFromPost;
    const postUnliked = await post.save();
    res.status(200).json(postUnliked);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

//add like to comment
router.put("/:postId/comment/:commentId/like", auth, async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId).populate(
      "author",
      "_id username followers following image"
    )
    if (!post) return res.status(404).json("Post not found");
    const commentFound = post.comments.find((comment) => comment._id.toString() === commentId.toString())
    if (commentFound.likes.find((like) => like === req.user.username)) {
      return res.status(401).json("Comment is already liked");
    }
    commentFound.likes.push(req.user.username);
    const commentFromPostLiked = await post.save();
    res.status(200).json(commentFromPostLiked);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

//remove like from comment
router.put("/:postId/comment/:commentId/unlike", auth, async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId).populate(
      "author",
      "_id username followers following image"
    )
    if (!post) return res.status(404).json("Post not found");
    const commentFound = post.comments.find((comment) => comment._id.toString() === commentId.toString())
    const likeFromCommentRemoved = commentFound.likes.filter((like) => like !== req.user.username)
    commentFound.likes = likeFromCommentRemoved
    commentFromPostUnliked = await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});


//------------like------------//

//------------comment------------//

//add comment to post
router.post("/:postId/comment", auth, async (req, res) => {
  const { postId } = req.params;
  const { textOfComment } = req.body;
  try {
    const post = await Post.findById(postId).populate("author", "_id username followers following image");
    if (!post) return res.status(404).json("Post not found");
    const newComment = {
      textOfComment,
      author: req.user.username,
    };
    post.comments.push(newComment);
    const postCommented = await post.save();
    res.status(200).json(postCommented);
  } catch (error) {
    res.status(500).json("Server Error");
  }
});

//remove comment from post
router.delete("/:postId/comment/:commentId", auth, async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const post = await Post.findById(postId).populate("author", "_id username followers following image");
    if (!post) return res.status(404).json("Post not found");
    const removeCommentFromPost = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    post.comments = removeCommentFromPost;
    const postUpdated = await post.save();
    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(404).json("Post not found");
  }
});

//edit comment from post
router.put("/:postId/comment/:commentId", auth, async (req, res) => {
  const { postId, commentId } = req.params;
  const { textOfComment } = req.body;
  try {
    const post = await Post.findById(postId).populate("author", "_id username followers following image");
    if (!post) return res.status(404).json("Post not found");
    const commentFound = post.comments.find((comment) => comment._id.toString() === commentId.toString())
    commentFound.textOfComment = textOfComment
    const postUpdated = await post.save();
    res.status(200).json(postUpdated);
  } catch (error) {
    res.status(404).json("Post not found");
  }
});

//------------comment------------//

module.exports = router;
