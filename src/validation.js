const Joi = require('joi');

const singupValidationSchema = Joi.object({
  user: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

const taskValidationSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  description: Joi.string().min(5).max(500).required(),
  completed: Joi.boolean(),
});

module.exports = {
  singupValidationSchema,
  loginValidationSchema,
  taskValidationSchema,
};