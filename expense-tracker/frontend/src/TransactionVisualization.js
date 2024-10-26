import React from 'react';
import { Pie } from 'react-chartjs-2';

const TransactionVisualization = ({ transactions }) => {
  // Calculate total expenses and income
  const expenseData = transactions
    .filter((tx) => tx.type.toLowerCase() === 'expense')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const incomeData = transactions
    .filter((tx) => tx.type.toLowerCase() === 'income')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  // Log the calculated data for debugging
  console.log('Filtered Expenses:', expenseData);
  console.log('Filtered Income:', incomeData);
  console.log('All Transactions:', transactions);

  const data = {
    labels: ['Expenses', 'Income'],
    datasets: [
      {
        label: 'Expenses vs Income',
        data: [expenseData, incomeData],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2 text-center">Transaction Visualization</h2>
      <div className="w-full max-w-xs mx-auto" style={{ height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionVisualization;
