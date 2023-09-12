/**
 * For API calls of authentication service
 * @param {*} param0
 * @returns
 */

const loginUser = async ({ username, password }) => {
  try {
    if (username === 'purdriven' && password === 'dianapps') {
      // Simulate login logic and get user data and token
      let newToken = `02384-fdgdf-23423-${Math.random(10000)}`;
      localStorage.setItem('token', newToken);

      return { user: { name: 'PurDriven DianApps' }, token: newToken };
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    // Handle authentication error
    return { error };
  }
};

const logoutUser = async () => {
  return {
    status: true,
  };
};

export { loginUser, logoutUser };
