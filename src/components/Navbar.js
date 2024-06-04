import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../api/storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfile } from "../api/auth";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

  const { data: me } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
  });

  return (
    <div className="navbar bg-white text-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
          >
            <li>
              <Link to="/dashboard">DashBoard</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">BANK</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/dashboard">DashBoard</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end text-white">
        <span className="text-green-500 font-bold"> {me?.balance} USD</span>
        <a
          className="btn bg-white border-green-300 text-black"
          onClick={handleLogout}
        >
          LogOut
        </a>
      </div>
    </div>
  );
};
export default Navbar;
