import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TProduct } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TProduct;

const actGetProduct = createAsyncThunk(
  "products/actGetProduct",
  async (id: string, { rejectWithValue, signal }) => {
    const { error, errorMag, data } = await fetchGetData<TData>(
      `/products/${id}`,
      signal,
    );
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetProduct;
