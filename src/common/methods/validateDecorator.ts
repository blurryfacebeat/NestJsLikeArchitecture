import { validate, ValidationError } from 'class-validator';

import { isObjectEmpty } from '../../util/index.js';

interface IValidationError extends ValidationError {
  errorsList?: Array<string>;
}

export const validateDecorator = async (object: object) => {
  const errors: Array<IValidationError> = await validate(object, { validationError: { target: false } });

  errors.forEach((error) => {
    if (error.constraints && !isObjectEmpty(error.constraints))
      error.errorsList = Object.values(error.constraints).map((value) => value);
  });

  return errors;
};
