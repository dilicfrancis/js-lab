import { useDispatch } from "react-redux";
import Card from "../UI/Card";
import { cartActions } from "../../store/cart-slice";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { item, price, description, id } = props;

  const addHandler = () => {
    dispatch(cartActions.addItem({ id, item, price }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{item}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
