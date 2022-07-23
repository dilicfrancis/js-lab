import { Link } from "react-router-dom";

const Products = () => {
  return (
    <section>
      <h1>The Product Page!</h1>
      <ul>
        <li>
          <Link to="/products/details/book">Book</Link>
        </li>
        <li>
          <Link to="/products/details/pant">Pant</Link>
        </li>
        <li>
          <Link to="/products/details/khakis">Khakis</Link>
        </li>
        <li>
          <Link to="/products/details/lubricant">Lubricant</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
