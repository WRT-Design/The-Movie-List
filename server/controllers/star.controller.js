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
  if (req.body.ratingId) {
    data.ratingId = req.body.ratingId;
    type = "rating";
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

exports.findAllStars = async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;

  let result = await Star.getAllStars(id, type);
  if (!result) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while getting the stars",
    });
  } else {
    res.status(200).send({ result: result });
  }
};

exports.deleteOne = async (req, res) => {
  console.log("star | delete one");
  const delId = req.params.delId;
  const type = req.params.type;

  console.log("delId: ", delId);
  console.log("type: ", type);

  if (type === "one") {
    let deleteResult = await Star.deleteOne(delId);
    if (!deleteResult) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the star",
      });
    } else {
      res.status(200).send({
        message: "Star deleted successfully",
      });
    }
  }
  if (type === "all") {
    let deleteResult = await Star.deleteAll(delId);
    if (!deleteResult) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the star",
      });
    } else {
      res.status(200).send({
        message: "Star deleted successfully",
      });
    }
  }
};
