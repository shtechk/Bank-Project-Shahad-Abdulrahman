import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { transferFunds } from "../api/auth";

const Modal = ({ show, setShowModal }) => {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["transferFunds"],
    mutationFn: () => transferFunds(amount, username),
    onSuccess: () => {
      setShowModal(false);
      queryClient.invalidateQueries(["amount"]);
    },
  });

  if (!show) return "either username or funds aren't there";

  return (
    <div
      className="inset-0 fixed  flex justify-center items-center flex-col z-20 overflow-hidden 
      "
    >
      <div className="bg-black absolute z-0 opacity-70 inset-0 "></div>
      <div className="relative z-10 flex flex-col gap-3 border-[3px] border-black rounded-md w-[95%] md:w-[40%] h-[300px] md:h-[30%] bg-white pt-[50px]">
        <button
          className="right-0 top-2 absolute w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-red-400"
          onClick={() => {
            setShowModal(false);
          }}
        >
          Close
        </button>
        {username}
        <p>{amount}</p>
        <input
          placeholder="Username here"
          name="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          placeholder="Amount here"
          name="Amount"
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />

        <button
          className="w-[70px] border border-black rounded-md ml-auto mr-5 hover:bg-green-400"
          onClick={mutate}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Modal;
