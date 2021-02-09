const Movie = require('../models/movie');
const { NotFoundError, BadRequestError } = require('../errors');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      throw new NotFoundError('Пока что фильмов нет');
    }
    return res.status(200).send(movies);
  } catch (err) {
    next(err);
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
    nameRU,
    nameEN,
  } = req.body;

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
      nameRU,
      nameEN,
    });
    return res.status(201).send(newMovie);
  } catch (err) {
    next(
      err.name === 'ValidationError'
        ? new BadRequestError('Переданы некорректные данные')
        : err
    );
  }
};

const deleteMovieById = async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return res.status(200).send(deletedMovie);
  } catch (err) {
    next(
      err.name === 'CastError'
        ? new BadRequestError('Переданы некорректные данные')
        : err
    );
  }
};

module.exports = { getMovies, createMovie, deleteMovieById };
