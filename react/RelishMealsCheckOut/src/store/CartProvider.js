import { useReducer } from "react";

import CartContext from "./cart-context";

const cartDefaultState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const stockTotal =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let stockedItems;
    if (existingItem) {
      const changeQuantity = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      stockedItems = [...state.items];
      stockedItems[existingItemIndex] = changeQuantity;
    } else {
      stockedItems = state.items.concat(action.item);
    }

    return { items: stockedItems, totalAmount: stockTotal };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const stockTotal = state.totalAmount - existingItem.price;
    let stockedItems;
    if (existingItem.amount === 1) {
      stockedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const unStockedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      stockedItems = [...state.items];
      stockedItems[existingItemIndex] = unStockedItem;
    }
    return { items: stockedItems, totalAmount: stockTotal };
  }

  if (action.type === "CLEAR") {
    return cartDefaultState;
  }

  return cartDefaultState;
};

const CartProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, cartDefaultState);

  const addItemToCartHandler = (item) => {
    cartDispatch({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    cartDispatch({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    cartDispatch({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
