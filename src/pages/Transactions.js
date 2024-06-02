import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getTransactions } from "../api/auth";
import MyLoader from "../components/MyLoader";

const Transactions = () => {
  const { data: me, isLoading } = useQuery({
    queryKey: ["getTransactions"],
    queryFn: () => getTransactions,
  });


  const handleChange = (e) => {
    e.preventDefault();
   getTransaction();
  };
  };




  if (isLoading) return <h1>{MyLoader}</h1>;

  return (
    <div>
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    <button onClick: ></button>
    </div>
  )

export default Transactions;
