module.exports = (app) => {
  // const reply = require("../controllers/reply.controler.js");

  var router = require("express").Router();

  // create a new reply
  // app.post("/api/reply", reply.createOne);
  app.use("/api/post", router);
};
