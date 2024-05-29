import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const quantitySeletor = createSelector(
  (state: RootState) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.quantity, 0),
);

export { quantitySeletor };
