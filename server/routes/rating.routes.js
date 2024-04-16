module.exports = (app) => {
  const rating = require("../controllers/rating.controller.js");

  var router = require("express").Router();

  /**
   * Creates a new rating
   *
   * @query {String} type: simple || complex
   */
  app.post("/api/rating", rating.createOne);

  /**
   * Gets all the ratings for a movie or user
   *
   * @param {String} ratingType movie || user
   */
  app.get("/api/rating/:ratingType", rating.findAllRatingsFor);

  /**
   * Updates a rating
   *
   * @param {String} ratingId Id of the rating
   * @body {Object} fields to update
   */
  app.put("/api/rating/:ratingId", rating.update);

  // // get all rating
  // app.get("/api/rating", rating.findAll);

  /**
   * Deletes a rating
   *
   * @param {String} ratingId Id of the rating
   */
  app.delete("/api/rating/:ratingId", rating.deleteOne);

  app.use("/api/rating", router);
};
