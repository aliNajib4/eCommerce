import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { IProduct } from "@types/product";

type TData = IProduct[];

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (params: string, { rejectWithValue }) => {
    let data: TData = [];
    let error = false;
    let errorMag = "";
    await axios
      .get<TData>(
        `http://localhost:5005/products?cat_prefix=${params === "all" ? "" : params}`,
      )
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

export default actGetProducts;
