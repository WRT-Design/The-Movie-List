const Follows = require("../models/follows.model.js");

exports.createOne = async (req, res) => {
  console.log("follows | create one");

  const followerId = req.body.followerId;
  const followingId = req.body.followingId;

  const data = {
    followerId: followerId,
    followingId: followingId,
  };

  let createResult = await Follows.create(data);
  if (!createResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the follows",
    });
  } else {
    res.status(200).send({
      message: "Follows created successfully",
      follows: createResult,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;

  if (type === "one") {
    let result = await Follows.deleteOne(id);
    if (!result) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the follows",
      });
    } else {
      res.status(200).send({
        message: "Follows deleted successfully",
      });
    }
  }
  if (type === "all") {
    let result = await Follows.deleteAll(id);
    if (!result) {
      res.status(500).send({
        err: "error",
        message: "Some error occurred while deleting the follows",
      });
    } else {
      res.status(200).send({
        message: "Follows deleted successfully",
      });
    }
  }
};
