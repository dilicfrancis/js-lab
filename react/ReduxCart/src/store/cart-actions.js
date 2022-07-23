import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const retrieveData = () => {
  return async (dispatch) => {
    const request = async () => {
      const response = await fetch(
        "https://reacttests-95607-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Couldn't reach the server...");
      }

      const data = await response.json();

      return data;
    };
    try {
      const cartItems = await request();
      dispatch(
        cartActions.cartFeed({
          items: cartItems.items || [],
          quantity: cartItems.quantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notify({
          status: "error",
          title: "Stopped",
          message: "Unable to reach the server.",
        })
      );
    }
  };
};

export const sendData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      uiActions.notify({
        status: "pending",
        title: "Initializing",
        message: "Connecting to the server.",
      })
    );

    const request = async () => {
      const response = await fetch(
        "https://reacttests-95607-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartItems.items,
            quantity: cartItems.quantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Couldn't reach the server...");
      }
    };
    try {
      await request();
      dispatch(
        uiActions.notify({
          status: "success",
          title: "Done",
          message: "Successfully connected to the server.",
        })
      );
    } catch (errors) {
      dispatch(
        uiActions.notify({
          status: "error",
          title: "Stopped",
          message: "Unable to reach the server.",
        })
      );
    }
  };
};
