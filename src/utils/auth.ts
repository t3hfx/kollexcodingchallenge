export const validateUsernameAndPassword = (value: {
  username: string;
  password: string;
}) => {
  const usernameError = validateUsername(value.username);
  const passwordError = validatePassword(value.password);

  if (usernameError || passwordError) {
    return {
      username: usernameError,
      password: passwordError,
    };
  }
};

export const validateUsername = (username: string) => {
  if (username.length < 5) return 'Username should be at least 5 symbols';
  if (username.length > 20) return 'Username maximum length is 20';
};

export const validatePassword = (password: string) => {
  if (!passwordRegex.test(password))
    return 'Password value has minimum 8 and maximum 20 character limit and must have at least 1 uppercase, 1 lowercase and 1 special character';
};

const passwordRegex =
  /^(?=.*)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/;
