import { createAsyncThunk } from "@reduxjs/toolkit";
import { type TCategory } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, { rejectWithValue, signal }) => {
    const { error, errorMag, data } = await fetchGetData<TData>(
      "/categories",
      signal,
    );
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetCategories;
