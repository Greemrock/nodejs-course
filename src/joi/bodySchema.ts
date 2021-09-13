import * as Joi from 'joi';

export const bodySchema = Joi.object({
  login: Joi.string().required().min(4).max(30),
  password: Joi.string().required().regex(/^(\d+[a-zA-Z]|[a-zA-Z]+\d)(\d|[a-zA-Z])/, 'only letters and numbers').min(4).max(30),
  age: Joi.number().required().min(4).max(130),
});