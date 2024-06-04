import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      navigate("/dashboard");
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
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://img.freepik.com/free-vector/flat-design-poker-table-background_23-2151016809.jpg?t=st=1717005088~exp=1717008688~hmac=87d03b056221f21ca64f38204f7dcda30822d4914fed4dfcdaa2fe4c4cc24186&w=2000")',
      }}
    >
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="text-black text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-xl">To The Bank</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-white">Sign Up</h1>
          <h1 className="text-l font-bold mb-4 text-center text-white">
            You have an account:
            <Link
              to="/login"
              className="px-4 py-2 text-blue rounded hover:bg-white"
            >
              login
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

            <div className="mb-6">
              <label htmlFor="image" className="block text-white mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border border-white rounded"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useContext, useState } from "react";
// import UserContext from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { register } from "../api/auth";

// const Home = () => {
//   const [userInfo, setUserInfo] = useState({});
//   const [user, setUser] = useContext(UserContext);
//   const navigate = useNavigate();
//   const { mutate } = useMutation({
//     mutationKey: ["register"],
//     mutationFn: () => register(userInfo),
//     onSuccess: () => {
//       setUser(true);
//       navigate("/notes");
//     },
//   });

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
//     } else {
//       setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     mutate();
//   };

//   return (
//     <div className="flex w-1/2">
//       <div>
//         <h1>Register</h1>
//         <form onSubmit={handleFormSubmit}>
//           <div>
//             <label htmlFor="email" className="block">
//               Username
//             </label>
//             <input
//               name="username"
//               type="text"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block">
//               Password
//             </label>
//             <input
//               name="password"
//               type="password"
//               id="password"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="image" className="block">
//               Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               name="image"
//               onChange={handleChange}
//               className="w-full"
//               required
//             />

//             <div>
//               <button
//                 type="submit"
//                 className="px-4 py-2"
//                 onSubmit={handleFormSubmit}
//               >
//                 Register
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;
