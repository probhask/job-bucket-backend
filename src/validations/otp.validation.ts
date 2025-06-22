import Joi from 'joi';

export const sendEmailOtpSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email is not valid',
    }),
  }),
};

export const verifyEmailOtpSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email is not valid',
    }),
    otp: Joi.string().required().messages({
      'any.required': 'OTP is required',
    }),
  }),
};

export const sendPhoneOtpSchema = {
  body: Joi.object({
    phone: Joi.string().required().messages({
      'any.required': 'Phone is required',
    }),
  }),
};

export const verifyPhoneOtpSchema = {
  body: Joi.object({
    phone: Joi.string().required().messages({
      'any.required': 'Phone is required',
    }),
    otp: Joi.string().required().messages({
      'any.required': 'OTP is required',
    }),
  }),
};
