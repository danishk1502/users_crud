// // import { object, string, ref } from 'yup';
import * as yup from 'yup';
import { yupValidations } from './yup.validations';

export const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required().matches(yupValidations.PASSWORD),
  username: yup
    .string()
    .required()
    .min(8, 'Must be at least 8 characters')
    .max(20, 'Must be less  than 20 characters'),
});
