import "./styles/ExpensesList.css";
import ExpenseItem from "../Expenses/ExpenseItem";

const ExpensesList = (props) => {
  const list = props.list;

  if (list.length === 0) {
    return (
      <h2 className="expenses-list__fallback">No items for this period</h2>
    );
  }

  return (
    <ul className="expenses-list">
      {list.map((entry) => (
        <ExpenseItem
          key={entry.id}
          title={entry.title}
          amount={entry.amount}
          date={entry.date}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
