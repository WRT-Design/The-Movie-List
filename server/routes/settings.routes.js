module.exports = (app) => {
  const settings = require("../controllers/settings.controller");

  var router = require("express").Router();

  /**
   * Create a new setings document
   *
   */
  app.post("/api/settings", settings.createOne);

  /**
   * Update a setings document
   *
   * @param {String} id Id of the user
   * @param {String} code The settings ode to update
   */
  app.put("/api/settings/:id&:code", settings.update);

  /**
   * Get a setings documents for a user
   *
   * @param {String} id The id of the user
   */
  app.get("/api/settings/:id", settings.findOne);

  /**
   * Delete a setings document
   *
   * @param {String} id The id of the user
   */
  app.delete("/api/settings/:id", settings.deleteOne);
};
