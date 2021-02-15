const Movie = require('../models/movie');
const { NotFoundError, ForbiddenError } = require('../errors');

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
    next(checkMongoError(err));
  }
};

const deleteMovieById = async (req, res, next) => {
  const { id: movieId } = req.params;
  const { _id } = req.user;

  try {
    const movie = await Movie.findById(movieId).select('+owner');
    const ownerId = movie.owner.toString();

    if (ownerId !== _id) {
      throw new ForbiddenError('Недостаточно прав для удаления');
    }

    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return res.status(200).send(deletedMovie);
  } catch (err) {
    next(checkMongoError(err));
  }
};

module.exports = { getMovies, createMovie, deleteMovieById };
