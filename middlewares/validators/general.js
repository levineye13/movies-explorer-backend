const { celebrate, Joi } = require('celebrate');
const { isValid } = require('mongoose').Types.ObjectId;

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value, helpers) =>
        isValid(value) ? value : helpers.message('Невалидный id')
      ),
  }),
});

module.exports = { validateObjectId };
