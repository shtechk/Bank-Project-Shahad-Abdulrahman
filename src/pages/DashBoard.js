import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deposit, getProfile } from "../api/auth";

export const DashBoard = () => {
  const [user, setUser] = useContext(UserContext);
  const queryClient = useQueryClient();

  const { data: me, isLoading } = useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
  });

  const [depositAmount, setDepositAmount] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["deposit"],
    mutationFn: () => {
      deposit(depositAmount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["getProfile"]);
    },
  });

  return (
    <div className="flex justify-center mx-auto ">
      <div className="card card-compact w-96 bg-white shadow-xl">
        <figure>
          <img
            src="https://y.yarn.co/c89596ba-b06b-4108-90b8-324af5c59e44_text.gif"
            alt="MO MONEY MO PROBLEMS"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-green-500">Deposit...</h2>
          <p>
            Your Current Balance is:
            <span className="text-green-500 font-bold"> {me?.balance} USD</span>
          </p>

          <p className="text-black">
            Please enter the required amount to Deposit...
          </p>

          {user ? (
            <div>
              <label htmlFor="Quantity" className="sr-only">
                {" "}
                Quantity{" "}
              </label>

              <div className="flex items-center rounded border border-gray-200">
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="h-10 text-black bg-white w-full border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
              </div>

              <div className="card-actions justify-center py-10">
                <button className="btn btn-primary" onClick={mutate}>
                  Deposit Now
                </button>
              </div>
            </div>
          ) : (
            <p>Please log in to deposit funds.</p>
          )}
        </div>
      </div>
    </div>
  );
};

{
  /*
  This component uses @tailwindcss/forms

  yarn add @tailwindcss/forms
  npm install @tailwindcss/forms

  plugins: [require('@tailwindcss/forms')]

  @layer components {
    .no-spinner {
      -moz-appearance: textfield;
    }

    .no-spinner::-webkit-outer-spin-button,
    .no-spinner::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
*/
}

// <div>
//   <label htmlFor="Quantity" className="sr-only">
//     {" "}
//     Quantity{" "}
//   </label>

//   <div className="flex items-center rounded border border-gray-200">
//     <button
//       type="button"
//       className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
//     >
//       &minus;
//     </button>
//     <input
//       type="number"
//       value={depositAmount}
//       onChange={(e) => setDepositAmount(e.target.value)}
//       className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
//     />

//     <button
//       type="button"
//       className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
//     >
//       &plus;
//     </button>
//   </div>
// </div>;
