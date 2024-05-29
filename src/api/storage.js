// import jwt_decode from "jwt-decode";

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

// const checkToken = () => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     const decode = jwt_decode(token);
//     const currentTime = Date.now() / 1000;
//     if (decode.exp < currentTime) {
//       localStorage.removeItem("token");
//       return false;
//     }
//     return true;
//   }
//   return false;
// };

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { storeToken, getToken, removeToken };
