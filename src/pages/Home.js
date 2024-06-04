import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <section className="bg-gray-900 text-white">
      <div
        className="flex h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://img.freepik.com/free-vector/flat-design-poker-table-background_23-2151016809.jpg?t=st=1717005088~exp=1717008688~hmac=87d03b056221f21ca64f38204f7dcda30822d4914fed4dfcdaa2fe4c4cc24186&w=2000")',
        }}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Welcome!
              <span className="sm:block"> To The Bank</span>
            </h2>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <h1 className="text-l font-bold mb-4 text-center text-white py-10 ">
              <Link
                to="/register"
                className="px-7 py-5 bg-white text-black rounded hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </Link>
            </h1>

            <h1 className="text-l font-bold mb-4 text-center text-white ">
              <Link
                to="/login"
                className="px-10 py-5 bg-white text-black rounded hover:bg-blue-600 transition-colors "
              >
                login
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
