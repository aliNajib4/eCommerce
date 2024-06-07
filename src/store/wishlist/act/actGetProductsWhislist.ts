import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types/product";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetProductsWhislist = createAsyncThunk(
  "wishlist/actGetProductsWhislist",
  async (_, { rejectWithValue, getState, signal }) => {
    const {
      wishlist: { itemsId },
    } = getState() as RootState;
    const { data, error, errorMag } = await fetchGetData<TData>(
      `/products?userId=1`,
      signal,
    );

    const allProducts = data.filter((el) => itemsId.includes(el.id));

    return error ? rejectWithValue(errorMag) : allProducts;
  },
);

export default actGetProductsWhislist;
