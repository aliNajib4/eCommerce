import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct } from "@types/product";
import axios from "axios";

type TWishlist = { productId: string; userId: string; id: string }[];
type TData = IProduct[];

const actGetProductsWhislist = createAsyncThunk(
  "wishlist/actGetProductsWhislist",
  async (_, { rejectWithValue }) => {
    let data: TData = [];
    let error = false;
    let errorMag = "";
    await axios
      .get<TWishlist>(`/wishlist?userId=1`)
      .then((res) => {
        return res.data;
      })
      .then(async (wishlistIds) => {
        await axios
          .get<IProduct[]>("/products")
          .then((res) => res.data)
          .then((allProducts) => {
            data = allProducts.filter((el) =>
              wishlistIds.some(({ productId }) => productId === el.id),
            );
          })
          .catch((err) => {
            error = true;
            errorMag = err.message;
          });
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetProductsWhislist;
