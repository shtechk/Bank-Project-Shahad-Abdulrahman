import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { depositFunds, getProfile, withdrawFunds } from "../api/auth";
import Modal from "../components/Modal";

const Home = () => {
  const [amount, setAmount] = useState({});
  const [type, setType] = useState("deposit");
  const [showModal, setShowModal] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getProfile,
  });

  const { mutate: withdrawMutate } = useMutation({
    mutationKey: ["withdrawFunds", amount],
    mutationFn: () => withdrawFunds(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["amount"]);
    },
    onError: (e) => {
      alert("check for enough funds");
    },
  });

  const { mutate: depositMutate } = useMutation({
    mutationKey: ["depositFunds", amount],
    mutationFn: () => depositFunds(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["amount"]);
    },
  });

  // const { balance } = getProfile();
  const toggleType = () => {
    if (type === "deposit") {
      setType("withdraw");
    } else {
      setType("deposit");
    }
  };

  const handleChange = (e) => setAmount(e.target.value);

  return (
    <div className="flex items-center justify-center flex-col min-h-screen">
      <div className="p-6 border border-gray-300 rounded-lg w-50% ">
        <h1>Your available balance:</h1>
        <p>{data?.balance}</p>
        <button
          className="ml-auto w-[70%] rounded-md text-sm md:text-sm border border-black flex justify-center items-center bg-green-400 hover:bg-green-600"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Transfer Funds
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="p-4 border border-gray-300 rounded-lg">
          <label className="label cursor-pointer">
            <span className="label-text">Deposit</span>
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={type === "withdraw"}
              onChange={toggleType}
            />
            <span className="label-text">Withdraw</span>
          </label>
          <div>
            <input
              type="amount"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={handleChange}
            />

            <button
              className="btn btn-active"
              type="submit"
              onClick={type === "deposit" ? depositMutate : withdrawMutate}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Home;
