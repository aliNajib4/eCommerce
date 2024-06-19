import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { type TProduct } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetProductsWishlist = createAsyncThunk(
  "wishlist/actGetProductsWishlist",
  async (_, { rejectWithValue, getState, signal }) => {
    const {
      wishlist: { itemsId },
    } = getState() as RootState;
    if (itemsId.length === 0) return [];
    const ids = itemsId.map((id) => "id=" + id).join("&");
    const url = `/products?${ids}`;
    const { data, error, errorMag } = await fetchGetData<TData>(url, signal);

    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actGetProductsWishlist;
