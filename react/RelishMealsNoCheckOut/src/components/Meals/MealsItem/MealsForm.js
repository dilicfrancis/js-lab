import { useRef, useState } from "react";

import Input from "../../UI/Input";
import styles from "./MealsForm.module.css";

const MealsForm = (props) => {
  const [validAmount, setValidAmount] = useState(true);
  const amountRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();

    const amountStr = amountRef.current.value;
    const amountNum = +amountStr;

    if (amountStr.trim().length === 0 || amountNum < 1 || amountNum > 5) {
      setValidAmount(false);
      return;
    }
    props.onCartAdd(amountNum);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!validAmount && <p>Please enter a valid amount between 1 and 5.</p>}
    </form>
  );
};

export default MealsForm;
