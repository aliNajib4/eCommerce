import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const CartQuantitySeletor = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.quantity, 0),
);

const allPriceSeletor = createSelector(
  (state: RootState) => state.cart,
  ({ productsFullinfo: products, items }) =>
    products.reduce(
      (total, { price, id }) =>
        total +
        price * (items.find(({ id: id2 }) => id === id2)?.quantity ?? 0),
      0,
    ),
);

export { CartQuantitySeletor, allPriceSeletor };
