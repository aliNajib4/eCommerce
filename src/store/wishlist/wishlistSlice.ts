import { createSlice } from "@reduxjs/toolkit";
import actToggleWishlistItem from "./act/actToggleWishlistItem";
import actGetProductsWishlist from "./act/actGetProductsWishlist";
import actGetWishlist from "./act/actGetWishlist";
import { type TProduct, type TLoading } from "@types/.";
import { logout } from "@store/auth/authSlice";

type TWishlistState = {
  itemsId: string[];
  productsFullInfo: TProduct[];
  error: null | string;
  loadingProducts: TLoading;
};

const initialState: TWishlistState = {
  itemsId: [],
  error: null,
  productsFullInfo: [],
  loadingProducts: "idle",
};

const wishSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    cleanUp: (state) => {
      const { productsFullInfo, error, loadingProducts } = initialState;
      state.productsFullInfo = productsFullInfo;
      state.error = error;
      state.loadingProducts = loadingProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actToggleWishlistItem.pending, (state) => {
        state.error = null;
      })
      .addCase(actToggleWishlistItem.fulfilled, (state, action) => {
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
        state.error = action.payload as string;
      });

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

    builder.addCase(logout, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export const { cleanUp } = wishSlice.actions;
export { actToggleWishlistItem, actGetProductsWishlist };
export default wishSlice.reducer;
