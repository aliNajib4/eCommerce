import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types/product";
import axios from "axios";

type TData = TProduct[];

const actGetProductsWhislist = createAsyncThunk(
  "wishlist/actGetProductsWhislist",
  async (_, { rejectWithValue, getState }) => {
    let data: TData = [];
    let error = false;
    let errorMag = "";
    const {
      wishlist: { itemsId },
    } = getState() as RootState;
    await axios
      .get<TProduct[]>("/products")
      .then((res) => res.data)
      .then((allProducts) => {
        data = allProducts.filter((el) => itemsId.includes(el.id));
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });

    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetProductsWhislist;
