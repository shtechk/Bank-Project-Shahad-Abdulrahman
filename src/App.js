// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage";
import Home from "./pages/Profile";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";

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
        {user && <Navbar />}{" "}
        {/**because useState is set to false, therefore if user is logged in, aka true, then navbar will show */}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/transactions" Component={Transactions} />
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
