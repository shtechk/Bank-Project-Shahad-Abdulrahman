import React, { useState } from "react";
import { getAllTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import TransactionsItem from "../components/TransactionsItem";

import "react-datepicker/dist/react-datepicker.css";

const TransactionList = () => {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleSelect = (e) => {
    setFilterType(e.target.value);
  };

  const handleFromDate = (date) => {
    setFromDate(date);
  };

  const handleToDate = (date) => {
    setToDate(date);
  };

  const queryTransactions = transactions?.filter((transaction) => {
    return transaction.amount?.toString().includes(query);
  });

  const filteredTransactions = queryTransactions?.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.type === filterType;
  });

  const datedTransactions = filteredTransactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);
    return (
      (!fromDate || transactionDate >= fromDate) &&
      (!toDate || transactionDate <= toDate)
    );
  });

  const transactionList = datedTransactions?.map((transaction) => {
    return <TransactionsItem transaction={transaction} key={transaction._id} />;
  });

  if (isLoading)
    return <span className="loading loading-ball loading-lg"></span>;

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        padding: "8px",
        margin: "1rem",
      }}
    >
      <div className="input-group rounded relative ">
        <input
          onChange={handleSearch}
          type="search"
          className="w-full rounded-md border-black py-2.5 pe-10 shadow-sm sm:text-sm bg-white "
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <span className="absolute inset-y-0 px-3 end-0 grid w-10 place-content-center">
          <button type="button" className="text-black hover:text-gray-700">
            <span className="sr-only text-black">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
      <div>
        <select
          className=" bg-white border m-5 flex justify-center text-black border-gray py-2"
          value={filterType}
          onChange={handleSelect}
        >
          <option value="all">All Transactions</option>
          <option value="withdraw">Withdrawals</option>
          <option value="deposit">Deposits</option>
          <option value="transfer">Transfers</option>
        </select>
      </div>
      <div className=" text-black flex justify-center m-5">
        <label htmlFor="from-date">From Date:</label>
        <DatePicker
          className=" bg-white border border-gray"
          selected={fromDate}
          onChange={handleFromDate}
        />
        <label htmlFor="to-date">To Date:</label>
        <DatePicker
          className=" bg-white border border-gray"
          selected={toDate}
          onChange={handleToDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th type="date" dateFormat="dd/MM/yyyy">
              Date
            </th>
            <th>Type</th>
          </tr>
        </thead>
        {!transactions || transactions.length == 0 ? (
          <p className="no-transactions" style={{ textAlign: "center" }}>
            No transactions found.
          </p>
        ) : (
          <tbody>{transactionList}</tbody>
        )}
      </table>
    </div>
  );
};

export default TransactionList;
