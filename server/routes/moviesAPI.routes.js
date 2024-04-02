module.exports = (app) => {
  var router = require("express").Router();

  const headers = {
    "X-RapidAPI-key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  };

  // get with movie ID
  app.get("/api/moviesAPI/title/:id", async (req, res) => {
    const id = req.params.id;

    await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/${id}?info=custom_info`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        res.json(result); //sends the result
      });
  });

  // search a movie
  app.get("/api/moviesAPI/search/:title", async (req, res) => {
    const title = req.params.title;

    await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=false&info=custom_info&titleType=movie&limit=20`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        res.json(result); //sends the result
      });
  });

  app.use("/api/moviesAPI", router);
};
