export const loginUser = async payload => {
  console.log('login payload:', payload);
  return { success: true };
};

export const signupUser = async payload => {
  console.log('signup payload:', payload);
  return { success: true };
};