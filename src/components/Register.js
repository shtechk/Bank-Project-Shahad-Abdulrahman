import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/notes");
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
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
            <label htmlFor="email" className="block">
              Username
            </label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full"
              required
            />

            <div>
              <button
                type="submit"
                className="px-4 py-2"
                onSubmit={handleFormSubmit}
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
