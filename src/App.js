// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

import Register from "./components/Register";
import DashBoard from "./pages/DashBoard";
import TransactionList from "./pages/Transactions";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setUser(true);
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        {user && <Navbar />}

        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/dashboard" Component={DashBoard} />
          <Route path="/transactions" Component={TransactionList} />
          <Route path="/users" Component={Users} />
          <Route path="/profile" Component={Profile} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
        </Routes>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;

{
  /* <footer className="footer footer-center p-4 bg-base-300 text-base-content">
  <aside>
    <p>Copyright © 2024 - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer> */
}
