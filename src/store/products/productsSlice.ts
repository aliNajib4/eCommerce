import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./act/actGetProducts";
import actGetTopSellingProducts from "./act/actGetTopSellingProducts";
import actGetProduct from "./act/actGetProduct";
import { type TProduct, type TLoading } from "@types/.";

interface TProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: TProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUp: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetProducts.pending, (state) => {
        state.records = [];
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(actGetProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(actGetTopSellingProducts.pending, (state) => {
        state.records = [];
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetTopSellingProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload;
      })
      .addCase(actGetTopSellingProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(actGetProduct.pending, (state) => {
        state.records = [];
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = [action.payload];
      })
      .addCase(actGetProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export { actGetProducts, actGetTopSellingProducts };
export const { cleanUp } = productsSlice.actions;
export default productsSlice.reducer;
