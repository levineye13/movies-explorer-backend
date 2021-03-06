const { hash, genSalt, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const { checkMongoError } = require('../utils/utils');
const {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require('../errors');
const {
  HTTP_MESSAGES: { conflict, notFound },
} = require('../utils/constants');

const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new ConflictError(conflict);
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
    next(checkMongoError(err));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const isEqual = await compare(password, user.password);
    if (!isEqual) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }

    const token = sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res
      .status(204)
      .cookie('jwt', `Bearer ${token}`, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .end();
  } catch (err) {
    next(checkMongoError(err));
  }
};

const logout = (req, res, next) => {
  try {
    res.status(204).clearCookie('jwt').end();
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError(notFound);
    }
    return res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    return next(checkMongoError(err));
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
      },
    );
    return res.status(200).send({
      email: updatedUser.email,
      name: updatedUser.name,
    });
  } catch (err) {
    return next(checkMongoError(err));
  }
};

module.exports = {
  register,
  login,
  logout,
  getUser,
  updateUser,
};
