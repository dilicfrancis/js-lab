import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "101",
    price: 34,
    item: "Khaki Slacks",

    description: "Nice slacks from the seven ocean lines.",
  },
  {
    id: "202",
    price: 874,
    item: "Khaki Vests",

    description: "Premium vests from Afghanistan.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            id={product.id}
            item={product.item}
            price={product.price}
            key={product.id}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
