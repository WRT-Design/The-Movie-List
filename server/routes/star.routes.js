module.exports = (app) => {
  const star = require("../controllers/star.controller.js");

  var router = require("express").Router();

  /**
   * Creates a new star and connects the star to the user and the post type it is tied to.
   *
   */
  app.post("/api/star", star.createOne);

  /**
   * Gets all the stars tied to a user or post
   *
   * @param {String} id The id of the user or post
   * @param {String} type userId || postId || commentId || ratingId
   */
  app.get("/api/star/:id&:type", star.findAllStars);

  /**
   * Deletes one or more stars from the database
   *
   * @param {String} delId The id of the document to delete
   * @param {String} type one || all
   */
  app.delete("/api/star/:delId&:type", star.deleteOne);

  app.use("/api/star", router);
};
