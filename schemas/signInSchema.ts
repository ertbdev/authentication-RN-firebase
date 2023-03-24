import * as yup from 'yup';
import YupPassword from 'yup-password';
import {passwordValidation} from '../constants/forms';
YupPassword(yup);

export const signInSchema = yup.object().shape({
  email: yup.string().email('email-malformed').required('email-required'),
  password: yup
    .string()
    .required('password-required')
    .min(passwordValidation.minLength, 'password-wrong')
    .max(passwordValidation.maxLength, 'password-wrong')
    .minLowercase(passwordValidation.minLowerCase, 'password-wrong')
    .minUppercase(passwordValidation.minUpperCase, 'password-wrong')
    .minNumbers(passwordValidation.minNumbers, 'password-wrong')
    .minSymbols(passwordValidation.minSymbols, 'password-wrong'),
});
