import Joi from 'joi';
import ApiError from '@/utils/apiError';
import pick from '@/utils/pick';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from 'axios';

const validate =
  (schema: Object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']); //pick only the valid schema keys
    const obj = pick(req, Object.keys(validSchema)); // pick only the keys that are in the valid schema from the request

    const { value, error } = Joi.compile(validSchema)
      .prefs({ abortEarly: false, errors: { label: 'key' } })
      .validate(obj); // validate the object against the schema

    if (error) {
      const errorMessages = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(HttpStatusCode.BadRequest, errorMessages));
    }
    Object.assign(req, value); // assign the validated value to the request object
    return next(); // call the next middleware
  };

export default validate;
