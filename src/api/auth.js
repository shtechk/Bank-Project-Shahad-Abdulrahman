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
  const formData = new FormData(); //if we're sending any files to backend, image etc, we need formdata
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

const getProfile = async () => {
  const { data } = await instance.get("/mini-project/api/auth/me");
  return data;
};

const updateProfile = async (userInfo) => {
  const formData = new FormData();
  for (let key in userInfo) {
    formData.append(key, userInfo[key]);
  }
  const { data } = await instance.put(
    `/mini-project/api/auth/profile`,
    formData
  );

  return data;
};

const getAllTransactions = async () => {
  const res = await instance.get("/mini-project/api/transactions/my");
  return res.data;
};

const deposit = async (amount) => {
  const res = await instance.put("/mini-project/api/transactions/deposit", {
    amount,
  });
  return res;
};

const withdrawFunds = async (amount) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/withdraw",
    {
      amount,
    }
  );
  return data;
};

const depositFunds = async (amount) => {
  const { data } = await instance.put(
    "/mini-project/api/transactions/deposit",
    {
      amount,
    }
  );
  return data;
};

const transferFunds = async (amount, username) => {
  const { data } = await instance.put(
    `/mini-project/api/transactions/transfer/${username}`,
    {
      amount,
    }
  );
  return data;
};

export {
  login,
  register,
  getProfile,
  updateProfile,
  getAllUsers,
  logout,
  getAllTransactions,
  deposit,
  withdrawFunds,
  depositFunds,
  transferFunds,
};
