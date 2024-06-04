import instance from ".";
import { storeToken } from "./storage";

const login = async (userInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData(); //if we're sending any files to backend, image etc, we need formdata
  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.post("/auth/register", formData);

  storeToken(data.token);
  return data;
};

const getProfile = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const updateProfile = async (userInfo) => {
  const formData = new FormData();
  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.put(`/auth/profile`, formData);
  storeToken(data.token);
  return data;
};

const getTransactions = async () => {
  const { data } = await instance.get("/transactions/my");
  return data;
};

const withdrawFunds = async (amount) => {
  const { data } = await instance.put("/transactions/withdraw", {
    amount,
  });
  return data;
};

const depositFunds = async (amount) => {
  const { data } = await instance.put("/transactions/deposit", {
    amount,
  });
  return data;
};

const transferFunds = async (amount, username) => {
  const { data } = await instance.put(`/transactions/transfer/${username}`, {
    amount,
  });
  return data;
};

export {
  login,
  register,
  getProfile,
  updateProfile,
  getTransactions,
  withdrawFunds,
  depositFunds,
  transferFunds,
};
