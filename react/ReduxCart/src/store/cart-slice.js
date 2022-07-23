import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    quantity: 0,
    modified: false,
  },
  reducers: {
    cartFeed(state, action) {
      state.quantity = action.payload.quantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const cartItem = state.items.find((item) => item.id === newItem.id);
      state.quantity++;
      state.modified = true;
      if (!cartItem) {
        state.items.push({
          id: newItem.id,
          item: newItem.item,
          quantity: 1,
          price: newItem.price,
          amount: newItem.price,
        });
      } else {
        cartItem.quantity++;
        cartItem.amount += newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const cartItem = state.items.find((item) => item.id === id);
      state.quantity--;
      state.modified = true;
      if (cartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        cartItem.quantity--;
        cartItem.amount -= cartItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
