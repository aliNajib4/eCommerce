import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TProduct } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetTopSellingProducts = createAsyncThunk(
  "products/actGetTopSellingProducts",
  async (_, { rejectWithValue, signal }) => {
    const { error, errorMag, data } = await fetchGetData<TData>(
      `/top-selling`,
      signal,
    );
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetTopSellingProducts;
