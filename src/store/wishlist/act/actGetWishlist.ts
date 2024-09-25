import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, { rejectWithValue, getState }) => {
    const {
      auth: {
        user: { id: userId },
      },
    } = getState() as RootState;
    const q = query(collection(db, "wishlist"), where("userId", "==", userId));
    try {
      const data = await getDocs(q);
      return data.docs.map((el) => el.data().productId as string);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetWishlist;
