const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:id', deleteMovieById);

module.exports = router;
