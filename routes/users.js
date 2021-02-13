const router = require('express').Router();

const { validateUserUpdate } = require('../middlewares/validators');
const { logout, getUser, updateUser } = require('../controllers/users');

router.head('/signout', logout);
router.get('/users/me', getUser);
router.put('/users/me', validateUserUpdate, updateUser);

module.exports = router;
