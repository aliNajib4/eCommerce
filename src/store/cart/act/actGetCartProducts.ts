import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { TProduct } from "@types/product";
import { fetchGetData } from "@util/.";

type TData = TProduct[];

const actGetCartProducts = createAsyncThunk(
  "cart/actGetCartProducts",
  async (_, { rejectWithValue, getState, signal }) => {
    const { cart } = getState() as RootState;
    // get not found products in this way
    // const ids = cart.items.map((el) => "id=" + el.id).join("&");
    // const url = `/products/${ids}`
    const { error, errorMag, data } = await fetchGetData<TData>(
      "/products",
      signal,
    );
    const allProducts = data.filter((el) =>
      cart.items.some((item) => item.id === el.id),
    );
    return error ? rejectWithValue(errorMag) : allProducts;
  },
);

export default actGetCartProducts;
