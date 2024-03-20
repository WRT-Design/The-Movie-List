const Settings = require("../models/settings.model.js");

exports.createOne = async (req, res) => {
  console.log("settings | create one");

  const user = req.body.user;

  const data = {
    userId: user,
    code: "111111111",
    createdDate: new Date(),
  };

  let settingsResult = await Settings.create(data);
  if (!settingsResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while creating the settings",
    });
  } else {
    res.status(200).send({
      message: "Settings created successfully",
      settings: settingsResult,
    });
  }
};

exports.update = async (req, res) => {
  const userId = req.params.id;
  const code = req.params.code;

  let settingsResult = await Settings.update(userId, code);
  if (!settingsResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while updating the settings",
    });
  } else {
    res.status(200).send({
      message: "Settings updated successfully",
      settings: settingsResult,
    });
  }
};

exports.findOne = async (req, res) => {
  const userId = req.params.id;

  let settingsResult = await Settings.findOne(userId);
  if (!settingsResult) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while retrieving the settings",
    });
  } else {
    res.status(200).send({
      message: "Settings retrieved successfully",
      settings: settingsResult,
    });
  }
};

exports.deleteOne = async (req, res) => {
  // delete a settings document
  const userId = req.params.id;

  const result = await Settings.del(userId);
  if (!result) {
    res.status(500).send({
      err: "error",
      message: "Some error occurred while deleting the settings",
    });
  } else {
    res.status(200).send({
      message: "Settings deleted successfully",
    });
  }
};
