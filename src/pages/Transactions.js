// import { useQuery } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { getAllTransactions } from "../api/auth";

// const Transactions = () => {
//   const [filter, setFilter] = useState("");
//   // const [filteredData, setFilteredData] = useState(data);

//   const { data } = useQuery();

//   useQuery({
//     queryKey: ["transactions"],
//     queryFn: getAllTransactions,
//   });

//   const Transaction = data;
//   // ?.filter((Transactions) => Transactions.name.toLowerCase().includes(query.toLowerCase()))
//   // .map((Transactions) => <Transaction)

//   // useEffect(() => {
//   //   setFilteredData(
//   //     data.filter((item) =>
//   //       Object.values(item).some((val) =>
//   //         String(val).toLowerCase().includes(filter.toLowerCase())
//   //       )
//   //     )
//   //   );
//   // }, [filter]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Transactions Table</h1>
//       <input
//         type="text"
//         placeholder="Search..."
//         // value={filter}
//         // onChange={(e) => setFilter(e.target.value)}
//         className="border p-2 mb-4 w-full"
//       />
//       <table className="table-auto w-full border-collapse border border-gray-200">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2">Amount</th>
//             <th className="border border-gray-300 px-4 py-2">Date</th>
//             <th className="border border-gray-300 px-4 py-2">Type</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item) => (
//             <tr key={item.id}>
//               <td
//                 className={`border border-gray-300 px-4 py-2 ${
//                   item.type === "Credit" ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {item.amount}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">{item.date}</td>
//               <td
//                 c
//                 className={`border border-gray-300 px-4 py-2 ${
//                   item.type === "Credit" ? "text-green-500" : "text-red-500"
//                 }`}
//               >
//                 {item.type}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Transactions;

// // Sample data

// // export default FilterableTable;

import React, { useState } from "react";
import { getAllTransactions } from "../api/auth";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import TransactionsItem from "../components/TransactionsItem";

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
    return transaction.amount.toString() == query;
  });

  const filteredTransactions = queryTransactions?.filter((transaction) => {
    if (filterType === "all") return true;
    return transaction.type === filterType;
  });

  const datedTransactions = filteredTransactions?.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      (!fromDate || transactionDate >= fromDate) &&
      (!toDate || transactionDate <= toDate)
    );
  });

  const transactionList = datedTransactions?.map((transaction) => {
    return <TransactionsItem transaction={transaction} key={transaction.id} />;
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
      <div className="input-group rounded">
        <input
          onChange={handleSearch}
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
      <div>
        <select value={filterType} onChange={handleSelect}>
          <option value="all">All Transactions</option>
          <option value="withdraw">Withdrawals</option>
          <option value="deposit">Deposits</option>
          <option value="transfer">Transfers</option>
        </select>
      </div>
      <div>
        <label htmlFor="from-date">From Date:</label>
        <DatePicker selected={fromDate} onChange={handleFromDate} />
        <label htmlFor="to-date">To Date:</label>
        <DatePicker selected={toDate} onChange={handleToDate} />
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
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
