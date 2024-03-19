const Post = require("../models/post.model.js");
const util = require("./controller.util.js");

exports.createOne = async (req, res) => {
  console.log("post | create one");

  const post = req.body.post;
  const user = req.body.user;

  console.log("body: ", req.body);

  const data = {
    content: post,
    tot_stars: 0,
    createdDate: new Date(),
    userId: user,
  };

  let createResult = await Post.create(data);
  if (!createResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the post",
    });
  } else {
    res.status(200).send({
      message: "Post created successfully",
      post: createResult,
    });
  }
};

exports.findOne = async (req, res) => {};

exports.update = async (req, res) => {
  const postId = req.params.postId;
  const query = req.query;
  console.log("req.query: ", query);
  let options = "";

  let type = query.type;
  if (!query.type) {
    res.status(400).send({
      err: "error",
      message: "No type provided",
    });
  }

  const result = await Post.update(postId, type, query.userId, options);
};

exports.findAll = async (req, res) => {};

exports.findAllUserPosts = async (req, res) => {
  const userId = req.params.userId;

  const result = await Post.getAllUserPosts(userId);

  res.status(200).send({ result: result });
};

exports.deleteOne = async (req, res) => {
  const postId = req.params.postId;

  console.log("postId: ", postId);

  const result = await Post.del(postId);

  if (result.err) res.status(500).send(result);

  res.status(200).send(result);
};
