import { createSlice } from "@reduxjs/toolkit";
import actToggleWishlistItem from "./act/actToggleWishlistItem";
import actGetProductsWhislist from "./act/actGetProductsWhislist";
import { IProduct } from "@types/product";
import { TloadingProducts } from "@types/loadingProducts";

type TWishlistState = {
  itemsId: string[];
  productsFullInfo: IProduct[];
  error: null | string;
  loadingProducts: TloadingProducts;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actToggleWishlistItem.pending, (state) => {
        state.error = null;
      })
      .addCase(actToggleWishlistItem.fulfilled, (state, action) => {
        const { productId, type } = action.payload;
        console.log(productId, type);
        if (type === "add") state.itemsId.push(productId);
        else state.itemsId = state.itemsId.filter((item) => item != productId);
      })
      .addCase(actToggleWishlistItem.rejected, (state, action) => {
        state.error = action.error.message as string;
      });

    builder
      .addCase(actGetProductsWhislist.pending, (state) => {
        state.error = null;
        state.loadingProducts = "pending";
      })
      .addCase(actGetProductsWhislist.fulfilled, (state, action) => {
        state.loadingProducts = "succeeded";
        state.productsFullInfo = action.payload;
      })
      .addCase(actGetProductsWhislist.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.loadingProducts = "failed";
      });
  },
});

export { actToggleWishlistItem, actGetProductsWhislist };
export default wishSlice.reducer;
