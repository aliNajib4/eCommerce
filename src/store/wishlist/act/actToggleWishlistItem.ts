import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axios from "axios";

type TData = { productId: string; type: "add" | "remove" };

const actToggleWishlistItem = createAsyncThunk(
  "wishlist/actToggleWishlistItem",
  async (productId: string, { rejectWithValue, getState }) => {
    let data: TData;
    let error = false;
    let errorMag = "";
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;
    await axios
      .get<{ productId: string; userId: string; id: string }[]>(
        `/wishlist?userId=${userId}&productId=${productId}`,
      )
      .then((response) => response.data)
      .then(async (dataResponse) => {
        if (dataResponse.length == 0) {
          await axios
            .post<TData>(`/wishlist?userId=${userId}`, { userId, productId })
            .catch((err) => {
              error = true;
              errorMag = err.message;
            });
          data = { productId, type: "add" };
        } else {
          await axios.delete(`/wishlist/${dataResponse[0].id}`).catch((err) => {
            error = true;
            errorMag = err.message;
          });
          data = { productId, type: "remove" };
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
