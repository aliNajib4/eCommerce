import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@types/loadingCategories";
import { IProduct } from "@types/product";
import actGetCartProducts from "./act/actGetCartProducts";


interface ICartState {
  items: { id: string; quantity: number }[];
  productsFullinfo: IProduct[];
  loading: TLoading;
  error: null | string;

}

const initialState: ICartState = {
  items: [],
  productsFullinfo: [],
  loading: "idle",
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: string }) => {
      const idAdd = action.payload;
      if (!state.items.some((item) => item.id === idAdd))
        state.items.push({ id: idAdd, quantity: 1 });
      else
        state.items = state.items.map((item) => {
          if (item.id === idAdd) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actGetCartProducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetCartProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.productsFullinfo = action.payload;
      })
      .addCase(actGetCartProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      });
  }
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
