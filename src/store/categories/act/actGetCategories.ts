import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TCategory } from "@types/category";

type TData = TCategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, { rejectWithValue }) => {
    let data: TData = [];
    let error = false;
    let errorMag = "";
    await axios
      .get<TData>("/categories")
      .then((res) => {
        data = res.data;
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetCategories;
