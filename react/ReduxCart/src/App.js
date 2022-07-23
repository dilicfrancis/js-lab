import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendData, retrieveData } from "./store/cart-actions";

let initialRun = true;
function App() {
  const toggleCart = useSelector((state) => state.ui.cartVisible);
  const cart = useSelector((state) => state.cart);
  const progress = useSelector((state) => state.ui.prompt);
  console.log(progress);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveData());
  }, [dispatch]);

  useEffect(() => {
    if (initialRun) {
      initialRun = false;
      return;
    }

    if (cart.modified) {
      dispatch(sendData(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {progress && (
        <Notification
          status={progress.status}
          title={progress.title}
          message={progress.message}
        />
      )}
      <Layout>
        {toggleCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
