const router = require('express').Router();

const { register } = require('../controllers/users');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', register);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);

module.exports = router;
