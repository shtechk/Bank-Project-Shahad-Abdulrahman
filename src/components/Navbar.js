import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../api/storage";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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

// <nav className="bg-green-400">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex items-center justify-between h-16">
//       <div className="flex items-center">
//         <div className="block">
//           <NavLink
//             to="/"
//             className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Home
//           </NavLink>

//           <NavLink
//             to="/transactions"
//             className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Transactions
//           </NavLink>

//           <NavLink
//             to="/users"
//             className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Users
//           </NavLink>

//           <NavLink
//             to="/profile"
//             className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Profile
//           </NavLink>

//           <button
//             onClick={handleLogout}
//             className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </nav>
