const Star = require("../models/star.model.js");

exports.createOne = async (req, res) => {
  console.log("star | create one");

  const user = req.body.user;
  let type;

  const data = {
    userId: user,
    createdDate: new Date(),
  };
  if (req.body.postId) {
    data.postId = req.body.postId;
    type = "post";
  }
  if (req.body.commentId) {
    data.commentId = req.body.commentId;
    type = "comment";
  }

  let createResult = await Star.create(data, type);
  if (!createResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the star",
    });
  } else {
    res.status(200).send({
      message: "Star created successfully",
      star: createResult,
    });
  }
};
