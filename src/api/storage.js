const storeToken = (token) => {
  return localStorage.setItem("token", token);
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const removeToken = () => {
  return localStorage.removeItem("token");
};

export { storeToken, getToken, removeToken };
