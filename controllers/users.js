const { hash, genSalt } = require('bcryptjs');

const User = require('../models/user');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors');

const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new ConflictError('Такой пользователь уже существует');
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    const newUser = await User.create({
      email,
      password: passwordHash,
      name,
    });

    res.status(201).send({
      email: newUser.email,
      name: newUser.name,
    });
  } catch (err) {
    next(
      err.name === 'ValidationError'
        ? new BadRequestError('Переданы некорректные данные')
        : err
    );
  }
};

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

module.exports = { register, getUser, updateUser };
