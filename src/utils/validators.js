export const isValidEmail = email => {
  return /\S+@\S+\.\S+/.test(email);
};

export const isEmpty = value => {
  return !value || value.trim() === '';
};

export const isPasswordValid = password => {
  return password && password.length >= 6;
};