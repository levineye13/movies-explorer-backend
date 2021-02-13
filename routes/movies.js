const router = require('express').Router();

const {
  validateCreateMovie,
  validateObjectId,
} = require('../middlewares/validators');
const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validateCreateMovie, createMovie);
router.delete('/movies/:id', validateObjectId, deleteMovieById);

module.exports = router;
