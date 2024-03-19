module.exports = (app) => {
  const user = require("../controllers/star.controller.js");

  var router = require("express").Router();

  // create a new star
  app.post("/api/star", user.createOne);

  // get all stars for one user
  // app.get("/api/star/:userId", user.findAllUserStars);

  // // delete one star
  // app.delete("/api/star/:starId", user.deleteOne);

  app.use("/api/star", router);
};
