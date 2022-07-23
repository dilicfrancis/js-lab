import { useContext, useEffect, useState } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const [animateBtn, setAnimateBtn] = useState(false);
  const valueContext = useContext(CartContext);
  const { items } = valueContext;
  const numberOfCartItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);
  const btnStyle = `${styles.button} ${animateBtn ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setAnimateBtn(true);
    const timer = setTimeout(() => {
      setAnimateBtn(false);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnStyle} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
