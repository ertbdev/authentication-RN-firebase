import * as yup from 'yup';
import YupPassword from 'yup-password';
import {passwordValidation} from '../constants/forms';
YupPassword(yup);

export const signUpSchema = yup.object().shape({
  email: yup.string().email('email-malformed').required('email-required'),
  password: yup
    .string()
    .required('password-required')
    .min(passwordValidation.minLength, 'password-min')
    .max(passwordValidation.maxLength, 'password-max')
    .minLowercase(passwordValidation.minLowerCase, 'password-lower-case')
    .minUppercase(passwordValidation.minUpperCase, 'password-upper-case')
    .minNumbers(passwordValidation.minNumbers, 'password-number')
    .minSymbols(passwordValidation.minSymbols, 'password-special-character'),
  confirmPassword: yup
    .string()
    .required('password-required')
    .oneOf([yup.ref('password')], 'password-match'),
});
