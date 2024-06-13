import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { type TProduct } from "@types/.";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetCartProducts = createAsyncThunk(
  "cart/actGetCartProducts",
  async (_, { rejectWithValue, getState, signal }) => {
    const { cart } = getState() as RootState;
    const ids = cart.items.map((el) => "id=" + el.id).join("&");
    const url = `/products?${ids}`;
    const { error, errorMag, data } = await fetchGetData<TData>(url, signal);
    const allProducts = data.filter((el) =>
      cart.items.some((item) => item.id === el.id),
    );
    return error ? rejectWithValue(errorMag) : allProducts;
  },
);

export default actGetCartProducts;
