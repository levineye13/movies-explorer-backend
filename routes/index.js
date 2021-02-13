const router = require('express').Router();

const {
  validateRegistration,
  validateAuthorization,
} = require('../middlewares/validators');
const { register, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', validateRegistration, register);
router.post('/signin', validateAuthorization, login);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);

module.exports = router;
