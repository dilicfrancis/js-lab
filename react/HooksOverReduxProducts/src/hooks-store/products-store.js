import { baseStore } from "./store";

const buildStore = () => {
  const actions = {
    favToggle: (state, productId) => {
      const prodIndex = state.product.findIndex((p) => p.id === productId);
      const newFavStatus = !state.product[prodIndex].isFavorite;
      const updatedProducts = [...state.product];
      updatedProducts[prodIndex] = {
        ...state.product[prodIndex],
        isFavorite: newFavStatus,
      };
      return { product: updatedProducts };
    },
  };
  baseStore(actions, {
    product: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
};

export default buildStore;
