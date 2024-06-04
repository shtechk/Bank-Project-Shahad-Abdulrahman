import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import backgroundImg from "../components/m2jpg.jpg";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/profile");
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
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        // 'url("https://img.freepik.com/free-vector/flat-design-poker-table-background_23-2151016809.jpg?t=st=1717005088~exp=1717008688~hmac=87d03b056221f21ca64f38204f7dcda30822d4914fed4dfcdaa2fe4c4cc24186&w=2000")',
      }}
    >
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="text-black text-center ">
          <h2 className="text-6xl font-bold mb-4 text-white">Welcome!</h2>
          <p className="text-4xl text-white">To The Bank</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-white">Login</h1>
          <h1 className="text-l font-bold mb-4 text-center text-white">
            Don't have an account:
            <Link
              to="/register"
              className="px-4 py-2 text-blue rounded hover:bg-white"
            >
              Sign Up
            </Link>
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-white mb-2">
                Username
              </label>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                onClick={mutate}
                className="px-4 py-2 bg-white text-black rounded hover:bg-blue-600 transition-colors"
              >
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div>
//       <div>
//         <h1>Login</h1>
//         <form onSubmit={handleFormSubmit}>
//           <div>
//             <label htmlFor="username">Username:</label>

//             <input
//               name="username"
//               type="text"
//               id="username"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />
//           </div>

//           <div>
//             <label>Password</label>
//             <input
//               name="password"
//               type="password"
//               id="password"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />
//             <div>
//               <button
//                 type="submit"
//                 onClick={mutate}
//                 className="px-4 py-2 bg-white text-black rounded hover:bg-blue-600 transition-colors"
//               >
//                 login
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export default Login;
