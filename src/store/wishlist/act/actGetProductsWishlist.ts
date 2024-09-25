import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { type TProduct } from "@types/.";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/config";

type TData = TProduct;

const actGetProductsWishlist = createAsyncThunk(
  "wishlist/actGetProductsWishlist",
  async (_, { rejectWithValue, getState, signal }) => {
    const {
      wishlist: { itemsId },
    } = getState() as RootState;
    if (itemsId.length === 0) return [];
    const q = query(collection(db, "products"), where("id", "in", itemsId));
    try {
      const data = await getDocs(q);
      return data.docs.map((el) => el.data() as TData);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default actGetProductsWishlist;
