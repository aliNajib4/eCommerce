import { createSlice } from "@reduxjs/toolkit";
import TLoading from "@types/loading";
import TOrder from "@types/order";
import actPlaceOrder from "./act/actPlaceOrder";

type TOrdersState = {
  loading: TLoading;
  error: string | null;
  orderList: TOrder[];
};

const initialState: TOrdersState = {
  loading: "idle",
  error: null,
  orderList: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clean: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actPlaceOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actPlaceOrder.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actPlaceOrder.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export { actPlaceOrder };
export const { clean, cleanError } = ordersSlice.actions;
export default ordersSlice.reducer;
