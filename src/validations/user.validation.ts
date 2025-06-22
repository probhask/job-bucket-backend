import { Role } from '@/types';
import Joi from 'joi';

export const createUserValidation = {
  body: Joi.object({
    email: Joi.string().required().min(2),
    password: Joi.string()
      .required()
      .min(10)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/)
      .messages({
        'string.pattern.base':
          'Password must be at least 10 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol.',
      }),
    role: Joi.string().valid(Role).required(),
  }),
};

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().required().min(2),
    password: Joi.string().required().min(10),
  }),
};

export const updateUserValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    gender: Joi.string().valid(['M', 'F', 'O']).optional(),
    phoneNumber: Joi.string().min(10).max(15).optional(),
  }),
};
