const router = require('express').Router();

const { register, login } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', register);
router.post('/signin', login);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);

module.exports = router;
