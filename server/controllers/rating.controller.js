const Rating = require("../models/rating.model.js");
const Util = require("./controller.util.js");

exports.createOne = async (req, res) => {
  console.log("rating | create one");
  let movieId;
  let movie;

  const body = req.body;

  console.log("body: ", body);

  // first, check if the movie is in the DB,
  await fetch(`http://localhost:8080/api/movie/${body.movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movie = result.movie;
    });

  if (!movie) {
    // no movie found
    console.log("no movie found, we will create one");

    // create movieBody
    const movieBody = {
      title: body.movie,
      api_id: body.movieId,
      avg_overall: 0,
      avg_acting: 0,
      avg_attraction: 0,
      avg_cinemetography: 0,
      avg_dialogue: 0,
      avg_directing: 0,
      avg_editing: 0,
      avg_plot: 0,
      avg_soundtrack: 0,
      avg_specialEffects: 0,
      avg_theme: 0,
      createdDate: new Date(),
    };

    // create a new movie in the DB
    await fetch(`http://localhost:8080/api/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieBody),
    })
      .then((res) => res.json())
      .then((result) => {
        movie = result.movie;
        movieId = result.movie.id;
      });
  } else {
    // movie found
    console.log("movie found, we will get the id");
    // set the movieId
    movieId = movie.id;
  }
  console.log("movie: ", movie);
  let values = Object.values(body.ratings);
  let zeros = 0;
  let sum = values.reduce((acc, val) => {
    if (val === 0) {
      zeros++;
    }
    return acc + val;
  }, 0);
  let average = sum / (values.length - zeros);
  console.log("rating avg: ", average);
  // create the rating and add to the DB
  let data = {
    movieId: movieId,
    movie_title: movie.title,
    userId: body.user,
    average: average,
    acting: body.ratings.acting,
    attraction: body.ratings.attraction,
    cinemetography: body.ratings.cinemetography,
    dialogue: body.ratings.dialogue,
    directing: body.ratings.directing,
    editing: body.ratings.editing,
    plot: body.ratings.plot,
    soundtrack: body.ratings.soundtrack,
    specialEffects: body.ratings.specialEffects,
    theme: body.ratings.theme,
    personalScore: body.personalScore,
    review: body.review,
    tot_stars: 0,
    createdDate: new Date(),
  };
  let ratingResult = await Rating.create({ data });
  console.log("new rating: ", ratingResult);

  // get all ratings for a single movie
  let movieRatings;

  await fetch(`http://localhost:8080/api/rating/movie?id=${movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movieRatings = result.result;
    });

  console.log("movieRatings: ", movieRatings);

  let avg = Util.utils.getAverage(movieRatings);

  await fetch(`http://localhost:8080/api/movie/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avg),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("updated movie: ", result);
    });

  res.status(200).send({ message: "Rating created successfully." });
};

exports.update = async (req, res) => {
  // update a rating
  const ratingId = req.params.ratingId;
  const body = req.body;

  let fields = {};
  for (let field in body) {
    fields[field] = body[field];
  }

  const result = await Rating.update(ratingId, fields);

  // get the movie id *


  let movieRatings;

  await fetch(`http://localhost:8080/api/rating/movie?id=${movieId}`, {
    method: "GET",  
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movieRatings = result.result;
    });

  let avg = Util.utils.getAverage(movieRatings);

  await fetch(`http://localhost:8080/api/movie/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avg),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("updated movie: ", result);
    });

  if (!result) {
    res.status(500).send({ message: "Error when updating rating." });
  } else {
    res.status(200).send({ message: "Rating updated successfully." });
  }
};

exports.findAllRatingsFor = async (req, res) => {
  const ratingType = req.params.ratingType;
  let result;

  if (ratingType == "movie") {
    result = await Rating.getAllRatings("movieId", req.query.id);
  }
  if (ratingType == "user") {
    result = await Rating.getAllRatings("userId", req.query.id);
  }
  console.log(`get all ratings connected to '${ratingType}'`);

  res.status(200).send({ result: result });
};

exports.deleteOne = async (req, res) => {
  const ratingId = req.params.ratingId;
  const movieId = req.query.movieId;

  console.log("ratingId: ", ratingId);

  const result = await Rating.del(ratingId);

  let movieRatings;

  await fetch(`http://localhost:8080/api/rating/movie?id=${movieId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      movieRatings = result.result;
    });

  console.log("movieRatings: ", movieRatings);

  let data = Util.utils.getAverage(movieRatings);

  await fetch(`http://localhost:8080/api/movie/${movieId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log("updated movie: ", result);
    });

  if (result.err) res.status(500).send(result);

  res.status(200).send(result);
};
