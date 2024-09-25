import { createSlice } from "@reduxjs/toolkit";
import { type TLoading, type TProduct } from "@types/.";
import actGetCartProducts from "./act/actGetCartProducts";

interface ICartState {
  items: {
    id: string;
    quantity: number;
  }[];
  productsFullinfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: [],
  productsFullinfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: ICartState["items"][0] }) => {
      if (!state.items.some(({ id }) => id === action.payload.id))
        state.items.push({ ...action.payload });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.productsFullinfo = state.productsFullinfo.filter(
        (item) => item.id !== action.payload,
      );
    },
    changeQuantity: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
    },
    cleanUp: (state) => {
      const { productsFullinfo, error, loading } = initialState;
      state.productsFullinfo = productsFullinfo;
      state.error = error;
      state.loading = loading;
    },
    clearCartAfterPlaceOrder: (state) => {
      state.productsFullinfo = [];
      state.items = [];
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
        state.error = action.payload as string;
      });
  },
});

export { actGetCartProducts };
export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  cleanUp,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
