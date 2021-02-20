const { ObjectId } = require('mongoose').Types;

const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError } = require('../errors');
const { checkMongoError } = require('../utils/utils');
const {
  HTTP_MESSAGES: { notFound, forbidden },
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const movies = await Movie.find({ owner: ObjectId(_id) });
    if (movies.length === 0) {
      throw new NotFoundError(notFound);
    }
    return res.status(200).send(movies);
  } catch (err) {
    return next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  try {
    const newMovie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    });
    return res.status(201).send(newMovie);
  } catch (err) {
    return next(checkMongoError(err));
  }
};

const deleteMovieById = async (req, res, next) => {
  const { id: movieId } = req.params;
  const { _id } = req.user;

  try {
    const movie = await Movie.findById(movieId).select('+owner');

    if (!movie) {
      throw new NotFoundError(notFound);
    }

    const ownerId = movie.owner.toString();

    if (ownerId !== _id) {
      throw new ForbiddenError(forbidden);
    }

    await Movie.deleteOne(movie);
    return res.status(200).send({
      _id: movie._id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
  } catch (err) {
    return next(checkMongoError(err));
  }
};

module.exports = { getMovies, createMovie, deleteMovieById };
