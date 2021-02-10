const router = require('express').Router();

const { logout, getUser, updateUser } = require('../controllers/users');

router.head('/signout', logout);
router.get('/users/me', getUser);
router.put('/users/me', updateUser);

module.exports = router;
