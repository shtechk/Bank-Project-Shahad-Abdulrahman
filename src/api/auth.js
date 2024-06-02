import instance from ".";
import { removeToken, storeToken } from "./storage";

const login = async (userInfo) => {
  const { data } = await instance.post(
    "/mini-project/api/auth/login",
    userInfo
  );
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.post(
    "/mini-project/api/auth/register",
    formData
  );

  storeToken(data.token);
  return data;
};
const getAllUsers = async () => {
  const { data } = await instance.get("/mini-project/api/auth/users");
  return data;
};
const logout = () => {
  removeToken();
};

const getAllTransactions = async () => {
  const res = await instance.get("/mini-project/api/transactions/my");
  return res.data;
};

const deposit = async (amount) => {
  const res = await instance.post("/mini-project/api/transactions/deposit");
  return res;
};

export { login, register, getAllUsers, logout, getAllTransactions, deposit };
