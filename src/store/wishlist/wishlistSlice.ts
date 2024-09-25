import { createSlice } from "@reduxjs/toolkit";
import actToggleWishlistItem from "./act/actToggleWishlistItem";
import actGetProductsWishlist from "./act/actGetProductsWishlist";
import actGetWishlist from "./act/actGetWishlist";
import { type TProduct, type TLoading } from "@types/.";
import { actLogOut } from "@store/auth/authSlice";

type TWishlistState = {
  itemsId: string[];
  productsFullInfo: TProduct[];
  error: null | string;
  loadingProducts: TLoading;
  loadingToggle: TLoading;
};

const initialState: TWishlistState = {
  itemsId: [],
  error: null,
  productsFullInfo: [],
  loadingProducts: "idle",
  loadingToggle: "idle",
};

const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUp: (state) => {
      const { productsFullInfo, error, loadingProducts, loadingToggle } =
        initialState;
      state.productsFullInfo = productsFullInfo;
      state.error = error;
      state.loadingProducts = loadingProducts;
      state.loadingToggle = loadingToggle;
    },
  },
  extraReducers: (builder) => {
    // toggle wishlist item

    builder
      .addCase(actToggleWishlistItem.pending, (state) => {
        state.error = null;
        state.loadingToggle = "pending";
      })
      .addCase(actToggleWishlistItem.fulfilled, (state, action) => {
        state.loadingToggle = "succeeded";
        const { productId, type } = action.payload;
        if (type === "add") state.itemsId.push(productId);
        else if (type === "remove") {
          state.itemsId = state.itemsId.filter((item) => item != productId);
          state.productsFullInfo = state.productsFullInfo.filter(
            ({ id }) => id != productId,
          );
        }
      })
      .addCase(actToggleWishlistItem.rejected, (state, action) => {
        state.loadingToggle = "failed"
        state.error = action.payload as string;
      });

      // get products wishlist

    builder
      .addCase(actGetProductsWishlist.pending, (state) => {
        state.error = null;
        state.loadingProducts = "pending";
      })
      .addCase(actGetProductsWishlist.fulfilled, (state, action) => {
        state.loadingProducts = "succeeded";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetProductsWishlist.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loadingProducts = "failed";
      });

      // get wishlist

    builder
      .addCase(actGetWishlist.pending, (state) => {
        state.error = null;
        state.loadingProducts = "pending";
      })
      .addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loadingProducts = "succeeded";
        state.itemsId = action.payload;
      })
      .addCase(actGetWishlist.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loadingProducts = "failed";
      });

      // if log out in succeeded

    builder.addCase(actLogOut.fulfilled, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const { cleanUp } = wishSlice.actions;
export { actToggleWishlistItem, actGetProductsWishlist };
export default wishSlice.reducer;
