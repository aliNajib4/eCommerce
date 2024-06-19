import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { fetchGetData } from "@util/.";

type TDataWishlist = {
  userId: string;
  productId: string;
  id: string;
}[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;

    const { error, errorMag, data } = await fetchGetData<TDataWishlist>(
      `/wishlist?userId=${userId}`,
    );
    const ids = data.map((el) => el.productId);
    return error ? rejectWithValue(errorMag) : ids;
  },
);

export default actGetWishlist;
