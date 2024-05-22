import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { ICategory } from "@types/category";

type TData = ICategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, { rejectWithValue }) => {
    let data: TData = [];
    let error = false;
    let errorMag = "";
    await axios
      .get<TData>("http://localhost:5005/categories")
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
