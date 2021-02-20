const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "image" должно быть валидным url-адресом',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле "trailer" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "trailer" должно быть валидным url-адресом',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Поле "thumbnail" должно быть валидным url-адресом',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  movieId: {
    type: Number,
    required: true,
    select: false,
    validate: {
      validator: (v) => Number.isInteger(v) && Math.sign(v) >= 0,
      message: 'Поле "movieId" должно быть целым положительным числом',
    },
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заполнено'],
  },
});

module.exports = model('movie', movieSchema);
