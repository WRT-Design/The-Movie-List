const Rating = require("../models/rating.model.js");
const Movie = require("../models/movie.model.js");
const Util = require("./controller.util.js");

exports.createOne = async (req, res) => {
  console.log("rating | create one");
  let movieId;
  let movie;

  const type = req.query.type;

  const body = req.body;

  console.log("body: ", body);

  movie = await Movie.findBy("api_id", body.movieId);

  if (!movie) {
    // no movie found
    console.log("no movie found, we will create one");

    console.log("movieInfo", body.movieInfo);

    let genres = "";
    for (let genre of body.movieInfo.genres.genres) {
      genres += `${genre.text},`;
    }

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
      trailer: body.movieInfo.trailer,
      poster: body.movieInfo.image.url,
      genres: genres,
      year: body.movieInfo.year,
      plot: body.movieInfo.plot,
      createdDate: new Date(),
    };

    movie = await Movie.create({ movieBody });
    movieId = movie.movie.id;
  } else {
    // movie found
    console.log("movie found, we will get the id");
    // set the movieId
    movieId = movie.id;
  }

  if (type == "complex") {
    console.log("movie: ", movie);
    let values = Object.values(body.ratings);
    console.log("rating values: ", values);
    let average = Util.utils.getRatingAverage(values);
    console.log("rating avg: ", average);
    let ps = parseFloat(body.personalScore);

    // convert ratings to int
    values = values.map((val) => parseFloat(val));
    console.log("rating values: ", values);
    // create the rating and add to the DB
    let data = {
      movieId: movieId,
      movie_title: movie.title,
      userId: body.user,
      average: average,
      acting: values[0],
      attraction: values[1],
      cinemetography: values[2],
      dialogue: values[3],
      directing: values[4],
      editing: values[5],
      plot: values[6],
      soundtrack: values[7],
      specialEffects: values[8],
      theme: values[9],
      personalScore: ps,
      review: body.review,
      tot_stars: 0,
      createdDate: new Date(),
    };
    console.log("ratings data: ", data);
    let ratingResult = await Rating.create({ data });
    console.log("new rating: ", ratingResult);
  }
  if (type == "simple") {
    console.log("simple rating");
    let rating = parseFloat(body.rating);

    // get the simple, one rating.
    let data = {
      movieId: movieId,
      movie_title: movie.title,
      userId: body.user,
      average: rating,
      acting: rating,
      attraction: rating,
      cinemetography: rating,
      dialogue: rating,
      directing: rating,
      editing: rating,
      plot: rating,
      soundtrack: rating,
      specialEffects: rating,
      theme: rating,
      personalScore: rating,
      review: body.review,
      tot_stars: 0,
      createdDate: new Date(),
    };
    console.log("ratings data: ", data);
    let ratingResult = await Rating.create({ data });
    console.log("new rating: ", ratingResult);
  }

  // get all ratings for a single movie
  let movieRatings = await Rating.getAllRatings("movieId", movieId);

  console.log("movieRatings: ", movieRatings);

  let avg = Util.utils.getMovieAverage(movieRatings);

  Movie.update(movieId, avg);

  res.status(200).send({ message: "Rating created successfully." });
};

exports.update = async (req, res) => {
  // update a rating
  const ratingId = req.params.ratingId;
  const type = req.query.type;
  const body = req.body;
  let result;

  let fields = {};
  for (let field in body) {
    fields[field] = body[field];
  }

  if (!type) {
    result = await Rating.update(ratingId, fields);

    // update the movie
    let movieRatings;

    await fetch(`http://localhost:8080/api/rating/movie?id=${result.movieId}`, {
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

    await fetch(`http://localhost:8080/api/movie/${result.movieId}`, {
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
  } else if (type === "newStar") {
    // just a star
    result = await Rating.update(ratingId, fields, type);
  } else if (type === "delStar") {
    result = await Rating.update(ratingId, fields, type);
  }

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

  let data = Util.utils.getMovieAverage(movieRatings);

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
