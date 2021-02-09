const router = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');

router.get('/users/me', getUser);
router.put('/users/me', updateUser);

module.exports = router;
