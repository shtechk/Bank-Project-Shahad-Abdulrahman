import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { deposit } from "../api/auth";

export const DashBoard = () => {
  const [depositAmount, setDepositAmount] = useState("");

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://y.yarn.co/c89596ba-b06b-4108-90b8-324af5c59e44_text.gif"
          alt="MO MONEY MO PROBLEMS"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Deposit...</h2>
        <p>Please enter the required amount to Deposit...</p>
        <h2>Deposit Funds</h2>
        {"user" ? (
          <div>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => {}}>
                Deposit Now
              </button>
            </div>
          </div>
        ) : (
          <p>Please log in to deposit funds.</p>
        )}
      </div>
    </div>
  );
};
