const { celebrate, Joi } = require('celebrate');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const validateAuthorization = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

module.exports = {
  validateRegistration,
  validateAuthorization,
  validateUserUpdate,
};
