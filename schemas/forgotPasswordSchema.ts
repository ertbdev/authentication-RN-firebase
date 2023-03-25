import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('email-malformed').required('email-required'),
});
