type AuthFormErrors = {
  email: string[];
  password: string[];
  confirmPassword: string[];
};

export const getAuthYupErrors = (yupErrors: {message: string; path: keyof AuthFormErrors}[]) => {
  const _errors: AuthFormErrors = {email: [], password: [], confirmPassword: []};
  yupErrors.forEach(e => {
    e.path in _errors && _errors[e.path].push(e.message);
  });
  return _errors;
};
