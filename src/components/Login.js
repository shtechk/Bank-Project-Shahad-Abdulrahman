import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  //   const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);
      //   navigate("/");
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
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              className="w-full"
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
              className="w-full"
              required
            />
            <div>
              <button type="submit" className="px-4 py-2">
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
