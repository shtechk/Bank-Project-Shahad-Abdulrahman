import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  console.log({ user });
  return (
    <div>
      <h1> {user} </h1>
    </div>
  );
};

export default Profile;
