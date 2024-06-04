import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/store";

const wishlistQuantitySeletor = createSelector(
  (state: RootState) => state.wishlist.itemsId,
  (itemsId) => itemsId.length,
);

export { wishlistQuantitySeletor };
