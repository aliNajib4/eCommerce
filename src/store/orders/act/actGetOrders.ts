import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import TOrder from "@types/order";
import fetchGetData from "@util/fetchGetData";

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, { rejectWithValue, getState, signal }) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;

    const { error, errorMag, data } = await fetchGetData<TOrder[]>(
      `/orders?userId=${userId}`,
      signal,
    );
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetOrders;
