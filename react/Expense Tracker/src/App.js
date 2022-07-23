import { useState } from "react";
import NewExpense from "./component/Expenses/NewExpense/NewExpense";
import Expenses from "./component/Expenses/Expenses";

const start = [
  {
    id: "e1",
    title: "Toilet Paper",
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: "e3",
    title: "Car Insurance",
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: "e4",
    title: "New Desk (Wooden)",
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];
function App() {
  const [expenses, addexpense] = useState(start);
  const NewExpenseHandler = (data) => {
    addexpense((start) => [data, ...start]);
  };

  return (
    <>
      <NewExpense onNewExpense={NewExpenseHandler} />
      <Expenses expenses={expenses} />
    </>
  );
}

export default App;
