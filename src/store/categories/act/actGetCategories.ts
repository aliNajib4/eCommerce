import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "@types/category";
import { fetchGetData } from "@util/.";

type TData = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, { rejectWithValue }) => {
    const { error, errorMag, data } = await fetchGetData<TData>("/categories");
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetCategories;
