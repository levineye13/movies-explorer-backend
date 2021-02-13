const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string().custom((value, helpers) =>
      validator.isURL(value)
        ? value
        : helpers.message('Поле "image" должно быть валидным url-адресом')
    ),
    trailer: Joi.string().custom((value, helpers) =>
      validator.isURL(value)
        ? value
        : helpers.message('Поле "trailer" должно быть валидным url-адресом')
    ),
    thumbnail: Joi.string().custom((value, helpers) =>
      validator.isURL(value)
        ? value
        : helpers.message('Поле "thumbnail" должно быть валидным url-адресом')
    ),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле "nameEN" должно быть заполнено',
    }),
  }),
});

module.exports = { validateCreateMovie };
