import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "../styles/NewExpense.css";

const NewExpense = (props) => {
  const [newForm, setNewForm] = useState(false);
  const NewFormHandler = () => {
    setNewForm(true);
  };
  const CancelFormHandler = () => {
    setNewForm(false);
  };
  const SaveExpenseHandler = (data) => {
    const expenseData = {
      ...data,
      id: Math.random().toString(),
    };
    props.onNewExpense(expenseData);
  };

  let showForm = (
    <div className="new-expense">
      <button onClick={NewFormHandler}>Add New Expense</button>
    </div>
  );
  if (newForm === true) {
    showForm = (
      <div className="new-expense">
        <ExpenseForm
          onCancel={CancelFormHandler}
          onSaveExpense={SaveExpenseHandler}
        />
      </div>
    );
  }
  return showForm;
};

export default NewExpense;
