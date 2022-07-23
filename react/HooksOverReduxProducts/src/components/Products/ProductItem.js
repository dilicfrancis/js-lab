import React from "react";
import { useStore } from "../../hooks-store/store";
import Card from "../UI/Card";
import "./ProductItem.css";

const ProductItem = React.memo((props) => {
  //console.log("Rendering..");

  const dispatch = useStore(false)[1];
  const toggleFavHandler = () => {
    dispatch("favToggle", props.id);

    //toggleFav(props.id);
    // dispatch(toggleFav(props.id));
  };

  return (
    <Card style={{ marginBottom: "1rem" }}>
      <div className="product-item">
        <h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? "button-outline" : ""}
          onClick={toggleFavHandler}
        >
          {props.isFav ? "Un-Favorite" : "Favorite"}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
