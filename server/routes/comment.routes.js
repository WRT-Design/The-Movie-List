module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");

  var router = require("express").Router();

  // create a new comment
  app.post("/api/comment", comment.createOne);

  /**
   * Updates a comment
   *
   * @param {String} id Id of the comment
   * @param {String} type newStar || delStar || newComment || delComment
   */
  app.put("/api/comment/:id&:type", comment.update);

  /**
   * Gets a comment
   *
   * @param {String} id Id of the comment
   */
  app.get("/api/comment/:id", comment.findOne);

  /**
   * Delete a comment
   *
   * @param {String} id Id commmentId || userId
   * @param {String} type         one || many
   */
  app.delete("/api/comment/:id&:type", comment.delete);

  app.use("/api/comment", router);
};
