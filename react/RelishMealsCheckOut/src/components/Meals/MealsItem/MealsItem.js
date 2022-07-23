import { useContext } from "react";
import MealsForm from "./MealsForm.js";
import CartContext from "../../../store/cart-context";
import styles from "./MealsItem.module.css";

const MealsItem = (props) => {
  const cartContext = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const cartAddHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealsForm onCartAdd={cartAddHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
