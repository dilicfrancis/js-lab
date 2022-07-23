import Chart from "../UI/Chart";

const ExpenseChart = (props) => {
  const chartPlots = [
    { label: "January", value: 0 },
    { label: "February", value: 0 },
    { label: "March", value: 0 },
    { label: "April", value: 0 },
    { label: "May", value: 0 },
    { label: "June", value: 0 },
    { label: "July", value: 0 },
    { label: "August", value: 0 },
    { label: "September", value: 0 },
    { label: "October", value: 0 },
    { label: "November", value: 0 },
    { label: "December", value: 0 },
  ];
  const totalExpense = props.expenses;
  for (const eachExpense of totalExpense) {
    const expenseMonth = eachExpense.date.getMonth();
    chartPlots[expenseMonth].value += eachExpense.amount;
  }

  return <Chart plots={chartPlots} />;
};

export default ExpenseChart;
