// import { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./styles/ExpenseItem.css";
const ExpenseItem = (props) => {
  // const [title, setTitle] = useState(props.title);
  // const clickHandler = () => {
  //   setTitle("Updated"); //this is async
  //   console.log(title);
  // };
  return (
    <>
      <Card className="expense-item">
        <div className="expense-item__description">
          <ExpenseDate date={props.date} />
        </div>
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        {/* <button onClick={clickHandler}>Change Title</button> */}
      </Card>
    </>
  );
};

export default ExpenseItem;
