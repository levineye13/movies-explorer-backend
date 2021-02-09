const User = require('../models/user');
const { NotFoundError, BadRequestError } = require('../errors');

const getUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { email, name } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).send(updatedUser);
  } catch (err) {
    next(
      err.name === 'ValidationError'
        ? new BadRequestError('Переданы некорректные данные')
        : err
    );
  }
};

module.exports = { getUser, updateUser };
