import { useState } from "react";
import ExpensesList from "../UI/ExpensesList";
import Card from "../UI/Card";
import ExpensesFilter from "../UI/ExpensesFilter";
import ExpenseChart from "./ExpenseChart";
import "./styles/Expenses.css";
const Expenses = (props) => {
  const [year, selectYear] = useState("2021");
  const YearSelectHandler = (data) => {
    selectYear(data);
  };

  const expenseFilter = props.expenses.filter(
    (entry) => entry.date.getFullYear().toString() === year
  );

  return (
    <>
      <Card className="expenses">
        <ExpensesFilter defaultYear={year} onYearSelect={YearSelectHandler} />
        <ExpenseChart expenses={expenseFilter} />
        <ExpensesList list={expenseFilter} />

        {/* {props.expenses.map((entry) => {
          return (
            <ExpenseItem
              key={entry.id}
              title={entry.title}
              amount={entry.amount}
              date={entry.date}
            />
          );
        })} */}
      </Card>
    </>
  );
};

export default Expenses;
