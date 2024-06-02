import React, { useState } from "react";
import Footer from "../components/Footer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../api/auth";
import MyLoader from "../components/MyLoader";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: me, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
  });

  console.log(me);

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () => updateProfile(userInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfile"]);
      navigate("/");
    },
  });
  if (!me) return <div>We couldn't find your profile!</div>;
  const { image, username, balance } = me;

  if (isLoading) return <h1>{MyLoader}</h1>;

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={`https://react-bank-project.eapi.joincoded.com/${image}`}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{username}</h2>
        <p>Balance: {balance} BTC</p>
        <h6>Upload a profile picture</h6>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          required
        />
        <div className="card-actions">
          <button className="btn btn-primary" onSubmit={mutate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
