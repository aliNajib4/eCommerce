import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type TData = { productId: string; type: string };

const actToggleWishlistItem = createAsyncThunk(
  "wishlist/actToggleWishlistItem",
  async (id: string, { rejectWithValue }) => {
    let data: TData;
    let error = false;
    let errorMag = "";
    await axios
      .get<{ productId: string; userId: string; id: string }[]>(
        `/wishlist?userId=1`,
      )
      .then((response) => response.data)
      .then((dataResponse) => dataResponse.filter((el) => el.productId === id))
      .then(async (dataResponse) => {
        if (dataResponse.length == 0) {
          await axios
            .post<TData>(`/wishlist?useId=1`, { useId: "1", productId: id })
            .catch((err) => {
              error = true;
              errorMag = err.message;
            });
          data = { productId: id, type: "add" };
        } else {
          await axios.delete(`/wishlist/${dataResponse[0].id}`);
          data = { productId: id, type: "remove" };
        }
      })
      .catch((err) => {
        error = true;
        errorMag = err.message;
      });
    return error ? rejectWithValue(errorMag) : data;
  },
);

export default actToggleWishlistItem;
