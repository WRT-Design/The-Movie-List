const Comment = require("../models/comment.model.js");
const util = require("./controller.util.js");

exports.createOne = async (req, res) => {
  console.log("comment | create one");

  const body = req.body.comment;
  const user = req.body.user;
  const postType = req.body.postType;

  const data = {
    content: body,
    userId: user,
    [postType]: req.body.post,
    createdDate: new Date(),
    tot_stars: 0,
  };

  let createResult = await Comment.create(data);
  if (!createResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the comment",
    });
  } else {
    res.status(200).send({
      message: "Comment created successfully",
      comment: createResult,
    });
  }
};

exports.update = async (req, res) => {
  const commentId = req.params.id;
  const type = req.params.type;
  const body = req.body;

  const result = await Comment.update(commentId, type, body);

  if (!result) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while deleting the comment",
    });
  } else {
    res.status(200).send({ message: "Comment deleted successfully." });
  }
};

exports.findOne = async (req, res) => {
  const commentId = req.params.id;

  let commentResult = await Comment.findOne(commentId);
  if (!commentResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while finding the comment",
    });
  } else {
    res.status(200).send({
      message: "Comment found successfully",
      comment: commentResult,
    });
  }
};

exports.delete = async (req, res) => {
  const delId = req.params.id;
  const delType = req.params.type;

  if (delType === "one") {
    let result = await Comment.deleteOne(delId);
    if (!result) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the comment",
      });
    } else {
      res.status(200).send({ message: "Comment deleted successfully." });
    }
  } else if (delType === "many") {
    let result = await Comment.deleteMany(delId);
    if (!result) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the comment",
      });
    } else {
      res.status(200).send({ message: "Comment deleted successfully." });
    }
  }
};
