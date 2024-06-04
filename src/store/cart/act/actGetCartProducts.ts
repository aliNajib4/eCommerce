import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types/product";
import axios from "axios";

type TData = TProduct[];

const actGetCartProducts = createAsyncThunk(
  "cart/actGetCartProducts",
  async (_, { rejectWithValue, getState }) => {
    const { cart } = getState() as RootState;
    // get not found products in this way
    // const ids = cart.items.map((el) => "id=" + el.id).join("&");
    // const url = `/products/${ids}`
    let data: TData = [];
    let error = false;
    let errorMag = "";
    await axios
      .get<TData>("/products")
      .then((res) => {
        return res.data;
      })
      .then((allProducts) => {
        data = allProducts.filter((el) =>
          cart.items.some((item) => item.id === el.id),
        );
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetCartProducts;
