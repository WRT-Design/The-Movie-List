const Follows = require("../models/follows.model.js");

exports.createOne = async (req, res) => {
  console.log("follows | create one");

  const followerUsername = req.body.followerUsername;

  const followingId = req.body.followingId;

  // const data = {
  //   followerId: followerId,
  //   followingId: followingId,
  // };

  let createResult = await Follows.create(followerUsername, followingId);
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

exports.getFollowers = async (req, res) => {
  console.log("follows | get followers");

  const accountId = req.params.accountId;

  let result = await Follows.getFollowers(accountId);
  if (!result) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while getting the followers",
    });
  } else {
    res.status(200).send({
      message: "Followers retrieved successfully",
      follows: result,
    });
  }
};

exports.getFollowings = async (req, res) => {
  console.log("follows | get following");

  const accountId = req.params.accountId;

  let result = await Follows.getFollowings(accountId);
  if (!result) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while getting the following",
    });
  } else {
    res.status(200).send({
      message: "Following retrieved successfully",
      follows: result,
    });
  }
};

exports.delete = async (req, res) => {
  const delId = req.params.delId;
  const otherId = req.params.otherId;
  const type = req.params.type;

  if (type === "one") {
    let result = await Follows.deleteOne(delId, otherId);
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
    let result = await Follows.deleteAll(delId);
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
