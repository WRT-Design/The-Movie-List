module.exports = (app) => {
  const follows = require("../controllers/follows.controller.js");

  var router = require("express").Router();

  /**
   * Creates a new Follow document
   *
   * @param {String} followerId Id of the person who is following
   * @param {String} followingId Id of the person who is getting followed
   */
  app.post("/api/follows", follows.createOne);

  /**
   * Deletes one or more follows from the database
   *
   * @param {String} id Id of the account who unfollowed
   * @param {String} type 'one' || 'all'
   */
  app.delete("/api/follows/:id&:type", follows.delete);
};
