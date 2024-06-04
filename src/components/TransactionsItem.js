import React from "react";

const TransactionsItem = ({ transaction }) => {
  // Determine the CSS class based on the transaction type
  const amountClass =
    transaction.type === "deposit" ? "text-green-500" : "text-red-500";

  return (
    <tr key={transaction.id}>
      <td className={`border border-gray-300 px-4 py-2 ${amountClass}`}>
        {transaction.amount}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {transaction.createdAt}
      </td>
      <td className={`border border-gray-300 px-4 py-2 ${amountClass}`}>
        {transaction.type}
      </td>
    </tr>
  );
};

export default TransactionsItem;
