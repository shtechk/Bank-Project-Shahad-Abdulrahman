import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/");
    },
    onError: (e) => {
      alert("Please double-check your login details");
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <img
          className="max-w-lg rounded-lg shadow-2xl"
          src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-bank-clipart-cartoon-style-orange-building-light-blue-windows-bank-office-png-image_5831983.png"
          alt="bank"
        />
      </div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <h1>Login</h1>

        <p>
          Don't have an account? <Link to={"/register"}>Register Here</Link>
        </p>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              id="password"
              onChange={handleChange} // onChange = {setUserInfo({username: e.target.value})}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              required
            />
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
