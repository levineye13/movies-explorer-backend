const router = require('express').Router();

const {
  validateRegistration,
  validateAuthorization,
} = require('../middlewares/validators');
const { register, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const {
  HTTP_MESSAGES: { notFound },
} = require('../utils/constants');

router.post('/signup', validateRegistration, register);
router.post('/signin', validateAuthorization, login);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.all('*', () => {
  throw new NotFoundError(notFound);
});

module.exports = router;
