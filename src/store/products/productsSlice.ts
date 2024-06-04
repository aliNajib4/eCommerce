import { createSlice } from "@reduxjs/toolkit";
import actGetProducts from "./act/actGetProducts";
import { TProduct } from "@types/product";
import type { TLoading } from "@types/loadingCategories";

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
        state.error = action.error.message as string;
      });
  },
});

export { actGetProducts };
export const { cleanUp } = productsSlice.actions;
export default productsSlice.reducer;
