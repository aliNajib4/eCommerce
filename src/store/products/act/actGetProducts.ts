import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TProduct } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (params: string, { rejectWithValue, signal }) => {
    const { error, errorMag, data } = await fetchGetData<TData>(
      `/products${params === "all" ? "" : "?cat_prefix=" + params}`,
      signal,
    );
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetProducts;
